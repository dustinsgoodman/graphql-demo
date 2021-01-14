import { DataTypes, Deferrable } from 'sequelize';
import { connect } from 'DB/SQLiteConnect';
import { CharacterPhrases } from 'Phrases';
import { ValidationError } from 'Errors';

const sequelize = connect();
export const collection = sequelize.define(
  'Character',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        isAllowableStatus: (value) => {
          if (!['FEMALE', 'MALE', 'GENDERLESS', null].includes(value)) {
            throw new ValidationError(CharacterPhrases.Validations.gender(value));
          }
        },
      },
    },
    locationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Locations',
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    originId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Locations',
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        isAllowableStatus: (value) => {
          if (!['ALIVE', 'DEAD', null].includes(value)) {
            throw new ValidationError(CharacterPhrases.Validations.status(value));
          }
        },
      },
    },
    species: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    indexes: [{ fields: ['locationId'] }, { fields: ['originId'] }, { fields: ['status'] }],
  }
);
