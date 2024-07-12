const { Model, DataTypes } = require('sequelize');
//const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const User = require('./User');
class Pet extends Model { }

Pet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    profilePicture: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      allowNull: true
    },
    picture2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    interests: {
      type: DataTypes.INTEGER,
      allowNull: true
    }

  },
  {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'Pet',
  }
);

module.exports = Pet;
