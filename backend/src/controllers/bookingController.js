const Booking = require('../models/Booking');
const Experience = require('../models/Experience');

exports.create = async (req, res) => {
  const { experienceId, userName, email, slotDate, promoCode } = req.body;
  if (!experienceId || !userName || !email || !slotDate) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const exp = await Experience.findByPk(experienceId);
  if (!exp) return res.status(400).json({ message: 'Experience not found' });

  // capacity check based on availableTimes
  const t = slotDate.split(' ')[1];
  const times = Array.isArray(exp.availableTimes) ? exp.availableTimes : [];
  const entry = times.find((x) => (x.time || x) === t);
  const capacity = entry?.capacity ?? entry?.left ?? 0;
  if (!capacity) return res.status(400).json({ message: 'Slot already booked' });

  const count = await Booking.count({ where: { ExperienceId: experienceId, slotDate } });
  if (count >= capacity) return res.status(400).json({ message: 'Slot already booked' });

  const finalPrice = exp.price;
  const booking = await Booking.create({ userName, email, slotDate, promoCode, finalPrice, ExperienceId: experienceId });
  res.json({ id: booking.id, message: 'Booked' });
};
