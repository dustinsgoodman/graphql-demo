// eslint-disable-next-line no-unused-vars
import * as Repos from 'Repos';
import { connect, disconnect } from 'DB/SQLiteConnect';

let connection;

export const dbSetupAndTeardown = () => {
  let mockedConsoleLog;
  let mockedConsoleWarn;
  let mockedConsoleError;

  beforeAll(async () => {
    mockedConsoleLog = jest.spyOn(global.console, 'log').mockImplementation(() => {});
    mockedConsoleWarn = jest.spyOn(global.console, 'warn').mockImplementation(() => {});
    mockedConsoleError = jest.spyOn(global.console, 'error').mockImplementation(() => {});
    connection = connect();
    await connection.sync({
      force: true,
    });
  });

  afterAll(async () => {
    await disconnect();
    mockedConsoleLog.mockRestore();
    mockedConsoleWarn.mockRestore();
    mockedConsoleError.mockRestore();
  });
};

export const getConnection = () => connection;
