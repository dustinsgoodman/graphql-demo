import { Sequelize } from 'sequelize';
import { connect, disconnect } from 'DB/SQLiteConnect';

jest.mock('sequelize');

describe('.connect', () => {
  let subject;

  describe('when connection does not exist', () => {
    describe('when env is test', () => {
      beforeAll(() => {
        subject = connect();
      });

      afterAll(async () => {
        Sequelize.mockClear();
        await disconnect();
      });

      test('returns a db connection object', () => {
        expect(subject).toBeInstanceOf(Sequelize);
      });

      test('calls the constructor', () => {
        expect(Sequelize).toHaveBeenCalledWith({
          dialect: 'sqlite',
          dialectModule: expect.any(Object),
          storage: expect.stringContaining('data/test.sqlite'),
          logging: false,
        });
      });
    });

    describe('when env is not test', () => {
      const OLD_ENV = process.env;

      beforeAll(() => {
        process.env = {
          ...OLD_ENV,
          SLS_STAGE: 'local',
        };
        subject = connect();
      });

      afterAll(async () => {
        Sequelize.mockClear();
        process.env = OLD_ENV;
        await disconnect();
      });

      test('returns a db connection object', () => {
        expect(subject).toBeInstanceOf(Sequelize);
      });

      test('calls the constructor', () => {
        expect(Sequelize).toHaveBeenCalledWith({
          dialect: 'sqlite',
          storage: expect.stringContaining('data/local.sqlite'),
          dialectModule: expect.any(Object),
          logging: console.log,
        });
      });
    });
  });

  describe('when connection exists', () => {
    beforeAll(() => {
      connect();
      subject = connect();
    });

    afterAll(async () => {
      Sequelize.mockClear();
      await disconnect();
    });

    test('returns a db connection object', () => {
      expect(subject).toBeInstanceOf(Sequelize);
    });

    test('does not call the constructor', () => {
      expect(Sequelize).toHaveBeenCalledTimes(1);
    });
  });
});
