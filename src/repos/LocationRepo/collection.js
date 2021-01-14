import { DataTypes } from 'sequelize';
import { connect } from 'DB/SQLiteConnect';

const sequelize = connect();
export const collection = sequelize.define(
  'Location',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
    },
    dimension: {
      type: DataTypes.STRING,
    },
  },
  {
    indexes: [{ fields: ['dimension'] }, { fields: ['type'] }],
  }
);
