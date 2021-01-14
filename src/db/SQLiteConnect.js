import { Sequelize } from 'sequelize';
import path from 'path';

// has to be included via require
const sqlite = require('sqlite3').verbose();

let connection;

export const connect = () => {
  if (!connection) {
    const { SLS_STAGE } = process.env;
    const projectRoot = path.resolve(__dirname).split(/\/(services|src)/)[0];
    connection = new Sequelize({
      dialect: 'sqlite',
      dialectModule: sqlite,
      storage: `${projectRoot}/data/${SLS_STAGE}.sqlite`,
      logging: SLS_STAGE === 'test' ? false : console.log,
    });
  }
  return connection;
};

export const disconnect = async () => {
  await connection?.close();
  connection = null;
};
