// At the top of your file, make sure these are imported
const Booking = require('../models/Booking');
const Experience = require('../models/Experience');

// REPLACE your existing 'exports.create' with this entire function
exports.create = async (req, res) => {
  // --- DEBUG LOG 1: Function Start & Incoming Data ---
  console.log('--- [BOOKING CONTROLLER] "create" function has been hit ---');
  console.log('INCOMING DATA (req.body):', req.body);

  try { // <--- ADD THIS `try`
    const { experienceId, userName, email, slotDate, promoCode } = req.body;
    
    // --- DEBUG LOG 2: Checking Inputs ---
    console.log(`Validating inputs: experienceId=${experienceId}, userName=${userName}, email=${email}, slotDate=${slotDate}`);
    if (!experienceId || !userName || !email || !slotDate) {
      console.error('VALIDATION FAILED: Missing required fields');
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const exp = await Experience.findByPk(experienceId);
    if (!exp) {
      console.error(`VALIDATION FAILED: Experience with ID ${experienceId} not found.`);
      return res.status(400).json({ message: 'Experience not found' });
    }
    
    // --- DEBUG LOG 3: Checking Capacity ---
    console.log('Found Experience:', exp.toJSON()); // See what the experience data looks like
    const t = slotDate.split(' ')[1];
    const times = Array.isArray(exp.availableTimes) ? exp.availableTimes : [];
    console.log(`Checking for time slot "${t}" in availableTimes:`, times);

    const entry = times.find((x) => (x.time || x) === t);
    const capacity = entry?.capacity ?? entry?.left ?? 0;
    console.log(`Found entry:`, entry, `Calculated capacity: ${capacity}`);

    if (!capacity) {
      console.error('CAPACITY CHECK FAILED: Slot has no capacity or does not exist.');
      return res.status(400).json({ message: 'Slot already booked' });
    }

    const count = await Booking.count({ where: { ExperienceId: experienceId, slotDate } });
    console.log(`Current bookings for this slot: ${count}. Capacity is: ${capacity}`);
    if (count >= capacity) {
      console.error('CAPACITY CHECK FAILED: Slot is full.');
      return res.status(400).json({ message: 'Slot already booked' });
    }

    // --- DEBUG LOG 4: Preparing to Create Booking ---
    const finalPrice = exp.price;
    const bookingData = { userName, email, slotDate, promoCode, finalPrice, ExperienceId: experienceId };
    console.log('Data being passed to Booking.create():', bookingData);

    const booking = await Booking.create(bookingData);
    
    // --- SUCCESS LOG ---
    console.log('--- SUCCESS: Booking was saved to the database. ---', booking.toJSON());
    res.json({ id: booking.id, message: 'Booked' });

  } catch (error) { // <--- ADD THIS `catch` BLOCK
    // --- CRITICAL ERROR LOG ---
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.error('!!! AN UNEXPECTED ERROR OCCURRED !!!');
    console.error('This is likely a database or Sequelize error.');
    console.error(error); // This prints the full error object
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

    res.status(500).json({ message: "A server error occurred.", error: error.message });
  }
};