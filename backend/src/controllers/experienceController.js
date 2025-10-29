const Experience = require('../models/Experience');
const Booking = require('../models/Booking');
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  const exps = await Experience.findAll();
  res.json(exps);
};

exports.getOne = async (req, res) => {
  const id = req.params.id;
  const exp = await Experience.findByPk(id);
  if (!exp) return res.status(404).json({ message: 'Not found' });

  // compute dynamic left per time based on bookings
  const raw = exp.toJSON();
  const times = Array.isArray(raw.availableTimes) ? raw.availableTimes : [];
  if (times.length > 0) {
    const computed = await Promise.all(times.map(async (t) => {
      const time = t.time || t; // allow legacy string
      const capacity = t.capacity ?? t.left ?? 0;
      if (!capacity) return { time, left: 0, soldOut: true };
      const count = await Booking.count({ where: { ExperienceId: id, slotDate: { [Op.like]: `% ${time}` } } });
      const left = Math.max(0, capacity - count);
      return { time, left, soldOut: left <= 0 };
    }));
    raw.availableTimes = computed;
  }
  res.json(raw);
};
