import axios from 'axios';
require('dotenv').config();

export default axios.create({
  baseURL: 'https://api.rawg.io/api',
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    key: process.env.RAWG_API_KEY
  }
});