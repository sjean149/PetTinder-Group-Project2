const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserLike extends Model {}

UserLike.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      pet_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'pet',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'userlike',
      timestamps: false,
    }
  );

module.exports = UserLike;
