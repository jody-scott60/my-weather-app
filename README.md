# Weather Tracker App

- A full-stack weather tracking application with user authentication and persistent saved locations.
- Built with React + TypeScript, Node.js + Express, MongoDB, and Open-Meteo APIs.

# Tech Stack

- Frontend: React, TypeScript, CSS
- Backend: Node.js, Express
- Database: MongoDB, Mongoose
- Auth: JWT, bcrypt
- External APIs: Open-Meteo APIs :
  - 1. Geocoding (Place → Coordinates) URL: `https://geocoding-api.open-meteo.com/v1/search?name=${cityInput}&countryCode=${countryCodeInput}`
  - 2. Weather Forecast (Coordinates → Weather) URL: `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`

# Key Features

- User signup and login with JWT authentication
- Secure password hashing
- Create, retrieve, and delete saved weather locations
- Real-time weather data with scheduled refresh
- Duplicate entry and limit validation
- Fully typed frontend

# How It Works

- Users authenticate and receive a JWT
- Saved locations are stored per user in MongoDB
- Weather data is fetched from an external API using validated inputs
- Data refreshes periodically to keep results current

# Environment Setup

- Before running locally, the backend requires a MongoDB database and environment variables:
  - Mongo DB: Create a free cluster at MongoDB Atlas or use a local MongoDB instance
  - Environment Variables: In the backend foler, create a .env file with the following :
    - mongodb_uri=<your-mongodb-connection-string>
    - jwt_secret=<your-jwt-secret>
  - Backend reads .env automatically using dotenv

# Running Locally

- git clone https://github.com/jody-scott60/weather-tracker-app.git

- cd weather-tracker-app

- cd backend
- npm install
- node server.js
- Backend runs on http://localhost:3000 by default

- cd ../frontend
- npm install
- npm run dev
- Vite development server usually runs at http://localhost:5173

# License

MIT License
