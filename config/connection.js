const Sequelize = require('sequelize');
require('dotenv').config(); 

let sequelize;

// Check for database URL in environment variables
if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL); 
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,     
    process.env.DB_USER,     
    process.env.DB_PASSWORD, 
    {
      host: 'localhost',     
      dialect: 'postgres',
      port:5433    
    }
  );
}

module.exports = sequelize; 
