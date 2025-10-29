const { Sequelize } = require('sequelize');
require('dotenv').config();

// Determine if we are connecting to a cloud database that requires SSL.
// Most cloud providers' hostnames do not contain 'localhost'.
const isProduction = process.env.DB_HOST && !process.env.DB_HOST.includes('localhost');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    // --- CHANGE #1: Use the DB_PORT from your .env file ---
    // The || 3306 is a fallback for your local setup if DB_PORT isn't defined.
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // Keep logging off for production
    
    // --- CHANGE #2: Add dialectOptions for SSL ---
    // This is ONLY added if we are in a production/cloud environment.
    dialectOptions: isProduction ? {
      ssl: {
        require: true,
        // This is important for services like Railway/PlanetScale.
        // It trusts the server's certificate without needing a local CA file.
        rejectUnauthorized: false 
      }
    } : {} // For local development, pass an empty object (no SSL).
  }
);

module.exports = sequelize;