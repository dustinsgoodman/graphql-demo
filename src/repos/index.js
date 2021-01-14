import * as CharacterRepo from './CharacterRepo';
import * as EpisodeRepo from './EpisodeRepo';
import * as LocationRepo from './LocationRepo';

// Sequelize relationships go here
const Character = CharacterRepo.collection;
const Episode = EpisodeRepo.collection;
Character.belongsToMany(Episode, { through: 'Appearance' });
Episode.belongsToMany(Character, { through: 'Appearance' });

export { CharacterRepo, EpisodeRepo, LocationRepo };
