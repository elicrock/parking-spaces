require('dotenv').config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/parkingspaces';
// const JWT_SECRET = process.env.PROD === 'production' ? process.env.JWT_SECRET : 'dev-secret';

const corsOptions = {
  origin: [
    'http://localhost:3001',
  ],
};

module.exports = {
  PORT,
  MONGODB_URI,
  // JWT_SECRET,
  corsOptions,
};
