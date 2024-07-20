const { User } = require('../models');

const userData = [
  {
    "id": 1,
    "name": "Sephora",
    "email": "sephora@yahoo.com",
    "password": "password12345"
  },
  {
    "id": 2,
    "name": "Alex",
    "email": "Alex@gmail.com",
    "password": "password12345"
  },
  {
    "id": 3,
    "name": "Amiko",
    "email": "amiko2k20@aol.com",
    "password": "password12345"
  }
];

const seedUsers = async () => {
  for (const user of userData) {
    await User.create(user);
  }
};

module.exports = seedUsers;
