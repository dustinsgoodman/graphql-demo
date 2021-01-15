import { OK, BAD_REQUEST, INTERNAL_ERROR } from 'Utils/ResponseCodeUtils';
import { findById } from 'Repos/LocationRepo';
import LocationModel from 'Models/LocationModel';
import { LocationPhrases } from 'Phrases';
import { main as lambda } from '../src/handlers/location';

jest.mock('Repos/LocationRepo');

describe('.location', () => {
  let subject;

  describe('when no ID is passed', () => {
    beforeAll(async () => {
      const event = {
        body: JSON.stringify({}),
      };
      subject = await lambda(event, {});
    });

    test('returns BAD_REQUEST code', () => {
      expect(subject.code).toBe(BAD_REQUEST);
    });

    test('returns missing id message', () => {
      expect(subject.message).toBe(LocationPhrases.Validations.Id);
    });

    test('returns 400 statusCode', async () => {
      expect(subject.statusCode).toBe(400);
    });
  });

  describe('when location is found', () => {
    beforeAll(async () => {
      const locationData = { id: 1, name: 'Earth (C-137)' };
      findById.mockReturnValue(locationData);
      const event = {
        body: JSON.stringify({ locationId: 1 }),
      };
      subject = await lambda(event, {});
    });

    afterAll(() => {
      findById.mockReset();
    });

    test('returns OK code', () => {
      expect(subject.code).toBe(OK);
    });

    test('returns location record', () => {
      expect(subject.message).toBeInstanceOf(LocationModel);
    });

    test('returns 200 statusCode', async () => {
      expect(subject.statusCode).toBe(200);
    });
  });

  describe('when unknown error occurs', () => {
    beforeAll(async () => {
      findById.mockImplementation(() => {
        throw new Error('unknown');
      });
      const event = {
        body: JSON.stringify({ locationId: 1 }),
      };
      subject = await lambda(event, {});
    });

    afterAll(() => {
      findById.mockReset();
    });

    test('returns INTERNAL_ERROR code', () => {
      expect(subject.code).toBe(INTERNAL_ERROR);
    });

    test('returns error message', () => {
      expect(subject.message).toEqual('unknown');
    });

    test('returns 500 statusCode', async () => {
      expect(subject.statusCode).toBe(500);
    });
  });
});
