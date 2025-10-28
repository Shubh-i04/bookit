const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Promo = sequelize.define('Promo', {
  code: { type: DataTypes.STRING, allowNull: false, unique: true },
  type: { type: DataTypes.STRING }, // 'percent' or 'flat'
  value: { type: DataTypes.FLOAT }
});

module.exports = Promo;
