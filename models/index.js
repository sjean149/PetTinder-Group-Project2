const User = require('./User');
const Pet = require('./Pet');

// Set up associations
User.hasMany(Pet, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Pet.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Pet };
