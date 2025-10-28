# BookIt - Base Project

This repository contains a minimal starter fullstack project for the "BookIt" assignment:
- Frontend: Next.js + TypeScript + TailwindCSS
- Backend: Express + Sequelize + MySQL

## Quick start
1. Extract the zip.
2. Backend:
   - cd backend
   - copy .env.example -> .env and fill DB credentials
   - npm install
   - npm run seed  # optional, seeds sample experiences and promo codes
   - npm run dev
3. Frontend:
   - cd frontend
   - copy .env.example -> .env.local and set NEXT_PUBLIC_API_URL (default http://localhost:5000)
   - npm install
   - npm run dev
4. Open http://localhost:3000 for frontend, http://localhost:5000 for backend.

## To push to GitHub
```
git init
git add .
git commit -m "Initial BookIt scaffold"
git branch -M main
git remote add origin https://github.com/<your-username>/bookit-fullstack.git
git push -u origin main
```
