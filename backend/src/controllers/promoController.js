const Promo = require('../models/Promo');

exports.validate = async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ message: 'Code missing' });
  const promo = await Promo.findOne({ where: { code }});
  if (!promo) return res.status(404).json({ valid: false, message: 'Invalid code' });
  res.json({ valid: true, type: promo.type, value: promo.value });
};
