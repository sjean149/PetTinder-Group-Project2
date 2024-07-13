const sequelize = require('../config/connection');
const seedUser = require('./userSeed');
const seedPet = require('./petSeed')

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();
  await seedPet();

  process.exit(0);
};

seedAll();
