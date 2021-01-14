const aliases = require('../aliases');
require('@babel/register')({
  babelrc: false,
  configFile: false,
  presets: ['@babel/preset-env'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: aliases,
      },
    ],
  ],
});

const { request, gql } = require('graphql-request');
const { connect } = require('../src/db/SQLiteConnect');
const Repos = require('../src/repos');
const { create: createEpisode } = require('../src/repos/EpisodeRepo');
const { create: createLocation } = require('../src/repos/LocationRepo');
const { create: createCharacter } = require('../src/repos/CharacterRepo');

module.exports = (async () => {
  const API_URL = 'https://rickandmortyapi.com/graphql';
  const EPISODE_PAGES_QUERY = gql`
    query EpisodePagesQuery {
      episodes {
        info {
          pages
        }
      }
    }
  `;
  const EPISODE_QUERY = gql`
    query EpisodeQuery($page: Int) {
      episodes(page: $page) {
        results {
          id
          name
          air_date
          episode
        }
      }
    }
  `;

  const LOCATION_PAGES_QUERY = gql`
  query LocationPagesQuery {
    locations {
      info {
        pages
      }
    }
  }
  `;
  const LOCATION_QUERY = gql`
  query LocationQuery($page: Int) {
    locations(page: $page) {
      results {
        id
        name
        type
        dimension
      }
    }
  }
  `;

  const CHARACTER_PAGES_QUERY = gql`
  query CharacterPagesQuery {
    characters {
      info {
        pages
      }
    }
  }
  `;
  const CHARACTER_QUERY = gql`
  query CharacterQuery($page: Int) {
    characters(page: $page) {
      results {
        id
        name
        image
        gender
        location {
          id
        }
        origin {
          id
        }
        status
        species
        type
        episode {
          id
        }
      }
    }
  }
  `;

  const sortOnId = (a, b) => Number(a.id) - Number(b.id);

  const syncEpisodes = async () => {
    let data = await request(API_URL, EPISODE_PAGES_QUERY)
    const totalPages = data.episodes.info.pages;
    for (let page = 1; page <= totalPages; page++) {
      data = await request(API_URL, EPISODE_QUERY, { page })
      const sortedEpisodes = data.episodes.results.sort(sortOnId);
      for (let i = 0; i < sortedEpisodes.length; i++) {
        const { name, air_date: airDate, episode: code } = sortedEpisodes[i];
        await createEpisode({ name, airDate, code });
      }
    }
  };

  const syncLocations = async () => {
    let data = await request(API_URL, LOCATION_PAGES_QUERY)
    const totalPages = data.locations.info.pages;
    for (let page = 1; page <= totalPages; page++) {
      data = await request(API_URL, LOCATION_QUERY, { page })
      const sortedLocations = data.locations.results.sort(sortOnId);
      for (let i = 0; i < sortedLocations.length; i++) {
        const { name, type, dimension } = sortedLocations[i];
        await createLocation({ name, type, dimension });
      }
    }
  };

  const syncCharacters = async () => {
    let data = await request(API_URL, CHARACTER_PAGES_QUERY)
    const totalPages = data.characters.info.pages;
    for (let page = 1; page <= totalPages; page++) {
      data = await request(API_URL, CHARACTER_QUERY, { page })
      const sortedCharacters = data.characters.results.sort(sortOnId);
      for (let i = 0; i < sortedCharacters.length; i++) {
        const {
          name,
          image,
          gender,
          location,
          origin,
          status,
          species,
          type,
          episode: episodes
        } = sortedCharacters[i];
        let char = await createCharacter({
          name,
          image,
          gender: gender === 'unknown' ? null : gender.toUpperCase(),
          locationId: location.id,
          originId: origin.id,
          status: status === 'unknown' ? null : status.toUpperCase(),
          species,
          type
        });

        char.addEpisodes(episodes.map((ep) => Number(ep.id)));
      }
    }
  };

  // main script runner
  // reset database
  const connection = connect();
  await connection.sync({ force: true });

  // add records
  await syncEpisodes();
  await syncLocations();
  await syncCharacters();
})();
