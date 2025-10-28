const Booking = require('../models/Booking');
const Experience = require('../models/Experience');

exports.create = async (req, res) => {
  const { experienceId, userName, email, slotDate, promoCode } = req.body;
  if (!experienceId || !userName || !email || !slotDate) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  // prevent double booking for same slot and experience
  const existing = await Booking.findOne({ where: { ExperienceId: experienceId, slotDate }});
  if (existing) return res.status(400).json({ message: 'Slot already booked' });

  const exp = await Experience.findByPk(experienceId);
  if (!exp) return res.status(400).json({ message: 'Experience not found' });

  const finalPrice = exp.price; // promo logic could adjust
  const booking = await Booking.create({ userName, email, slotDate, promoCode, finalPrice, ExperienceId: experienceId });
  res.json({ id: booking.id, message: 'Booked' });
};
