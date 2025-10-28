const Experience = require('../models/Experience');

exports.getAll = async (req, res) => {
  const exps = await Experience.findAll();
  res.json(exps);
};

exports.getOne = async (req, res) => {
  const id = req.params.id;
  const exp = await Experience.findByPk(id);
  if (!exp) return res.status(404).json({ message: 'Not found' });
  res.json(exp);
};
