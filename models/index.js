const User = require('./User');
const Pet = require('./Pet');

User.hasMany(Pet, {
  foreignKey: 'owner_id',
});

Pet.belongsTo(User, {
  foreignKey: 'id',
});

module.exports = { User, Pet};
