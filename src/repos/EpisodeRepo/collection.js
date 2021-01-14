import { DataTypes } from 'sequelize';
import { connect } from 'DB/SQLiteConnect';

const sequelize = connect();
export const collection = sequelize.define(
  'Episode',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    airDate: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    indexes: [],
  }
);
