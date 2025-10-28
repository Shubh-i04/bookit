const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Experience = require('./Experience');

const Booking = sequelize.define('Booking', {
  userName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  slotDate: { type: DataTypes.STRING, allowNull: false },
  promoCode: { type: DataTypes.STRING },
  finalPrice: { type: DataTypes.FLOAT }
});

Booking.belongsTo(Experience);
Experience.hasMany(Booking);

module.exports = Booking;
