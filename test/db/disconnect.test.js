import { Sequelize } from 'sequelize';
import { connect, disconnect } from 'DB/SQLiteConnect';

jest.mock('sequelize');

describe('.disconnect', () => {
  describe('when no connection exists', () => {
    beforeAll(async () => {
      await disconnect();
    });

    test('does nothing', () => {
      expect(Sequelize.prototype.close).not.toHaveBeenCalled();
    });
  });

  describe('when connection exists', () => {
    beforeAll(async () => {
      connect();
      await disconnect();
    });

    test('closes the connection', () => {
      expect(Sequelize.prototype.close).toHaveBeenCalled();
    });
  });
});
