const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/db');

const experienceRoutes = require('./routes/experienceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const promoRoutes = require('./routes/promoRoutes');

const Experience = require('./models/Experience');
const Promo = require('./models/Promo');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('BookIt backend running'));

app.use('/experiences', experienceRoutes);
app.use('/bookings', bookingRoutes);
app.use('/promo', promoRoutes);

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
    // sync models
    await sequelize.sync({ alter: true });
    // ensure there are some promo codes
    const codes = await Promo.findAll();
    if (codes.length === 0) {
      await Promo.bulkCreate([
        { code: 'SAVE10', type: 'percent', value: 10 },
        { code: 'FLAT100', type: 'flat', value: 100 }
      ]);
      console.log('Seeded promos');
    }
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('DB connection failed, running in fallback mode', err.message);
    // fallback: run without DB for quick testing
    app.listen(PORT, () => console.log(`Server (no DB) running on port ${PORT}`));
  }
})();
