# Bookit - Experience Booking Platform

Bookit is a full-stack web application designed to provide users with a seamless experience for browsing and booking unique local activities and tours. The platform features real-time slot availability, a clean user interface, and a robust backend to manage experiences and bookings.

### ✨ Live Demo

**[View the live project here!](https://bookit-frontend-amp6.onrender.com/)**

---

### 📸 Project Screenshot



![Bookit Application Screenshot]<img width="1610" height="916" alt="image" src="https://github.com/user-attachments/assets/bcb105e9-0bc0-4fe5-9771-8c93c15c1f9a" /> <img width="1432" height="910" alt="image" src="https://github.com/user-attachments/assets/53e2965c-2435-4ad6-900a-4282e2675c12" /> <img width="1381" height="726" alt="image" src="https://github.com/user-attachments/assets/691b1781-0760-475c-9b2f-78b8b138ee06" /> <img width="845" height="479" alt="image" src="https://github.com/user-attachments/assets/3e17dd5b-2681-4cba-a820-1d41fa439e85" />





---

## 🚀 Features

- **Browse Experiences:** Users can view a gallery of available experiences with short descriptions.
- **Detailed View:** Click on any experience to see full details, pricing, and available dates.
- **Real-time Slot Booking:** Select a date and time slot. The system checks capacity in real-time to prevent overbooking.
- **Promo Codes:** Users can apply promotional codes for discounts.
- **Responsive Design:** A user-friendly interface that works on both desktop and mobile devices.

---

## 🛠️ Tech Stack

The project is built with a modern technology stack:

- **Frontend:**
  - **React.js** 
  -**Next.js**
  - **CSS3 / Styled-Components** 
- **Backend:**
  - **Node.js**
  - **Express.js**
  - **Sequelize ORM**
- **Database:**
  - **MySQL**
- **Deployment:**
  - **Frontend & Backend:** [Render](https://render.com/)
  - **Database:** [Railway](https://railway.app/)

---

## ⚙️ Getting Started (Local Setup)

To run this project on your local machine, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v16 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A code editor like [VS Code](https://code.visualstudio.com/)
- A Git client

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Shubh-i04/bookit.git
    cd bookit
    ```

2.  **Setup the Backend:**
    ```bash
    # Navigate to the backend folder
    cd backend 

    # Install dependencies
    npm install

    # Create a .env file in the backend folder
    touch .env
    ```
    - Open the `.env` file and add your database connection details. You can get these from your Railway dashboard.

    **.env.example for Backend:**
    ```
    # Port for the server to run on
    PORT=5000

    # Your Railway Database Connection Details
    DB_HOST=switchyard.proxy.rlwy.net
    DB_USER=root
    DB_PASSWORD=riunfLWFGLbyzMMKjdPIgJFvZVEIXZAo
    DB_NAME=railway
    DB_PORT=13087
    ```
    - **Seed the database with initial data (only needs to be run once):**
      ```bash
      npm run seed
      ```

    - **Run the backend development server:**
      ```bash
      npm run dev
    - The backend should now be running on `http://localhost:5000`.

3.  **Setup the Frontend:**
    ```bash
    # Navigate to the frontend folder from the root directory
    cd frontend 

    # Install dependencies
    npm install

    # Create a .env file in the frontend folder
    touch .env
    ```
    - Open the `.env` file and specify the backend API URL.

    **.env.example for Frontend:**
    ```
    # The URL of your running local backend server
    REACT_APP_API_URL=http://localhost:5000
    ```

    - **Run the frontend application:**
      ```bash
      npm run dev
      ```
    - The frontend should now open and run in your browser at `http://localhost:3000`.

---
## 📜 Available Scripts

### Backend (`/backend`)
- **`npm run dev`**: Starts the backend server in development mode with auto-reloading.
- **`npm start`**: Starts the backend server for production.
- **`npm run seed`**: Populates the database with initial sample data. Resets all existing data.

### Frontend (`/frontend`)
- **`npm run dev`**: Starts the Next.js application in development mode.
- **`npm run build`**: Creates an optimized production build of the application.
- **`npm start`**: Starts the production server for the built application.

---

## 🌐 Environment Variables

This project requires environment variables to connect to the database and run correctly.

#### Backend (`/backend/.env`)

- `PORT`: The port the Express server will run on.
- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`: Credentials for your MySQL database.

#### Frontend (`/frontend/.env`)

- `NEXT_PUBLIC_API_URL`: The full base URL for the backend API (e.g., `http://localhost:5000/api`).

---

## 🙏 Acknowledgements

- Project inspired by online booking platforms.
- Images sourced from [Unsplash](https://unsplash.com/).
- Special thanks to the teams behind Render and Railway for their excellent hosting platforms.
