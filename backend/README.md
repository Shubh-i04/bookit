# BookIt Backend (Express + Sequelize + MySQL)

## Setup
1. Copy `.env.example` to `.env` and set your MySQL credentials.
2. Install:
   ```
   npm install
   ```
3. Seed sample data (optional, creates two experiences and promos):
   ```
   npm run seed
   ```
4. Run dev:
   ```
   npm run dev
   ```
API endpoints:
- GET /experiences
- GET /experiences/:id
- POST /bookings
- POST /promo/validate
