const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Experience = sequelize.define('Experience', {
  title: { type: DataTypes.STRING, allowNull: false },
  shortDescription: { type: DataTypes.STRING(512) },
  description: { type: DataTypes.TEXT },
  image: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT, defaultValue: 0 },
  // legacy full slot strings (YYYY-MM-DD HH:mm)
  availableSlots: { type: DataTypes.JSON },
  // enhanced fields for UI
  availableDates: { type: DataTypes.JSON }, // ['2025-11-01','2025-11-02']
  availableTimes: { type: DataTypes.JSON } // [{ time: '07:00', left: 2 }, { time: '13:00', soldOut: true }]
});

module.exports = Experience;
