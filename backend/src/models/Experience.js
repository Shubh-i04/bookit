const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Experience = sequelize.define('Experience', {
  title: { type: DataTypes.STRING, allowNull: false },
  shortDescription: { type: DataTypes.STRING(512) },
  description: { type: DataTypes.TEXT },
  image: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT, defaultValue: 0 },
  availableSlots: { type: DataTypes.JSON } // array of dates/strings
});

module.exports = Experience;
