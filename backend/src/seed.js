require('dotenv').config();
const sequelize = require('./config/db');
const Experience = require('./models/Experience');
const Promo = require('./models/Promo');
const Booking = require('./models/Booking');

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    await Experience.bulkCreate([
      {
        title: 'Sunset Kayaking',
        shortDescription: 'Enjoy a peaceful kayak ride at sunset.',
        description: 'An easy kayaking trip suitable for beginners. Includes safety gear and instructor.',
        image: 'https://images.unsplash.com/photo-1436162716854-dcb9157bfac1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
        price: 999,
availableSlots: ['2025-11-01 17:00', '2025-11-02 18:00'],
        availableDates: ['2025-11-01','2025-11-02','2025-11-03'],
availableTimes: [ { time: '07:00', capacity: 4 }, { time: '09:00', capacity: 2 }, { time: '11:00', capacity: 5 }, { time: '13:00', capacity: 0 } ]
      },
      {
        title: 'Mountain Hike',
        shortDescription: 'Guided hike with scenic views.',
        description: 'A 6 km hike with rest stops and packed lunch provided.',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
        price: 1299,
availableSlots: ['2025-11-03 06:00', '2025-11-04 07:00'],
        availableDates: ['2025-11-03','2025-11-04','2025-11-05'],
availableTimes: [ { time: '06:00', capacity: 3 }, { time: '08:00', capacity: 1 }, { time: '10:00', capacity: 5 } ]
      },
      {
        title: 'Desert Safari',
        shortDescription: 'Thrilling dune bashing and sunset in the desert.',
        description: 'Experience an evening of dune bashing, camel rides, and a traditional dinner under the stars.',
        image: 'https://images.unsplash.com/flagged/photo-1550489518-40f49ba4bf20?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735',
        price: 1999,
availableSlots: ['2025-11-05 16:00', '2025-11-06 18:00'],
        availableDates: ['2025-11-05','2025-11-06','2025-11-07'],
availableTimes: [ { time: '16:00', capacity: 6 }, { time: '18:00', capacity: 2 } ]
      },
      {
        title: 'City Night Tour',
        shortDescription: 'Explore the city lights with a guided night tour.',
        description: 'Visit iconic landmarks, enjoy street food, and capture the skyline at night.',
        image: 'https://images.unsplash.com/photo-1525683458750-11e37873a958?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1172',
        price: 899,
availableSlots: ['2025-11-01 20:00', '2025-11-02 21:00'],
        availableDates: ['2025-11-01','2025-11-02','2025-11-03'],
availableTimes: [ { time: '20:00', capacity: 8 }, { time: '22:00', capacity: 0 } ]
      },
      {
        title: 'Scuba Diving',
        shortDescription: 'Discover the underwater world with certified instructors.',
        description: 'A beginner-friendly dive with all equipment included. Safety briefing and shallow reef dive.',
        image: 'https://images.unsplash.com/photo-1682686581295-7364cabf5511?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
        price: 3499,
availableSlots: ['2025-11-07 09:00', '2025-11-08 09:00'],
        availableDates: ['2025-11-07','2025-11-08','2025-11-09'],
availableTimes: [ { time: '09:00', capacity: 6 }, { time: '11:00', capacity: 6 } ]
      },
      {
        title: 'Taj Mahal Sunrise Tour — Agra',
        shortDescription: 'Early morning guided tour of the Taj with local breakfast.',
        description: 'Catch the first light on the marble, learn the history, and enjoy chai with local snacks.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=60',
        price: 1499,
availableSlots: ['2025-11-02 06:00', '2025-11-03 06:00'],
        availableDates: ['2025-11-02','2025-11-03','2025-11-04'],
availableTimes: [ { time: '06:00', capacity: 4 }, { time: '08:00', capacity: 4 } ]
      },
      {
        title: 'Jaipur Pink City Walk',
        shortDescription: 'Hawa Mahal, City Palace, bazaars, and sweets tasting.',
        description: 'A relaxed walking tour through Jaipur’s old city with a certified local guide.',
        image: 'https://images.unsplash.com/photo-1617516203158-1b87bb39caa7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=646',
        price: 1199,
availableSlots: ['2025-11-03 09:00', '2025-11-04 17:00'],
        availableDates: ['2025-11-03','2025-11-04','2025-11-05'],
availableTimes: [ { time: '09:00', capacity: 2 }, { time: '17:00', capacity: 4 } ]
      },
      {
        title: 'Kerala Backwaters Houseboat',
        shortDescription: 'Alleppey backwaters cruise with traditional meals.',
        description: 'Drift through serene canals, spot birds, and taste homely Kerala cuisine.',
        image: 'https://images.unsplash.com/photo-1644186087611-a47c59d3f786?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074',
        price: 4999,
availableSlots: ['2025-11-05 11:00', '2025-11-06 11:00'],
        availableDates: ['2025-11-05','2025-11-06','2025-11-07'],
availableTimes: [ { time: '11:00', capacity: 6 }, { time: '13:00', capacity: 5 } ]
      },
      {
        title: 'Rishikesh River Rafting',
        shortDescription: 'Ganga rafting with safety kayaker and cliff jump spot.',
        description: 'Exhilarating rapids for beginners; includes gear and transport back.',
        image: 'https://images.unsplash.com/photo-1718431108073-7f61fb5dfefb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
        price: 1799,
availableSlots: ['2025-11-07 08:00', '2025-11-08 08:00'],
        availableDates: ['2025-11-07','2025-11-08','2025-11-09'],
availableTimes: [ { time: '08:00', capacity: 4 }, { time: '10:00', capacity: 6 } ]
      },
      {
        title: 'Goa Beach Hopping',
        shortDescription: 'Candolim to Anjuna sunset trail with beach shacks.',
        description: 'Relaxed coastal day with hidden coves, cafes, and music.',
        image: 'https://plus.unsplash.com/premium_photo-1676517028516-527baf8d6291?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687',
        price: 1299,
availableSlots: ['2025-11-02 15:00', '2025-11-03 15:00'],
        availableDates: ['2025-11-02','2025-11-03','2025-11-04'],
availableTimes: [ { time: '15:00', capacity: 6 }, { time: '17:00', capacity: 3 } ]
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
