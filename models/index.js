const User = require('./User');
const Pet = require('./Pet');
const UserLike = require('./UserLike')

// Set up associations
User.hasMany(Pet, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Pet.belongsTo(User, {
  foreignKey: 'user_id',
});

Pet.hasMany(UserLike, {
  foreignKey: 'pet_id',
  onDelete: 'CASCADE'
});

UserLike.belongsTo(Pet, {
  foreignKey: 'pet_id'
});

User.hasMany(UserLike, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

UserLike.belongsTo(User, {
  foreignKey: 'user_id'
});


module.exports = { User, Pet, UserLike, };
