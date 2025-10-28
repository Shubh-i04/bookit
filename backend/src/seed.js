const sequelize = require('./config/db');
const Experience = require('./models/Experience');
const Promo = require('./models/Promo');

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    await Experience.bulkCreate([
      {
        title: 'Sunset Kayaking',
        shortDescription: 'Enjoy a peaceful kayak ride at sunset.',
        description: 'An easy kayaking trip suitable for beginners. Includes safety gear and instructor.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
        price: 999,
        availableSlots: ['2025-11-01 17:00', '2025-11-02 17:00']
      },
      {
        title: 'Mountain Hike',
        shortDescription: 'Guided hike with scenic views.',
        description: 'A 6 km hike with rest stops and packed lunch provided.',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
        price: 1299,
        availableSlots: ['2025-11-03 06:00', '2025-11-04 06:00']
      }
    ]);
    await Promo.bulkCreate([
      { code: 'SAVE10', type: 'percent', value: 10 },
      { code: 'FLAT100', type: 'flat', value: 100 }
    ]);
    console.log('Seeded sample data');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
