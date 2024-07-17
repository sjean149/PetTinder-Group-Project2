const { Model, DataTypes } = require('sequelize');
//const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
class Pet extends Model { }

Pet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    profilePicture: {
      type: DataTypes.JSON,
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
    },
    breed: {
      type: DataTypes.STRING,
    },
    picture1: {
      type: DataTypes.JSON,
      allowNull: true
    },
    picture2: {
      type: DataTypes.JSON,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    interests: {
      type: DataTypes.STRING,
      allowNull: true
    }

  },
  {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'pet',
  }
);

module.exports = Pet;
