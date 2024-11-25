import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.rawg.io/api',
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    key: '0ba4280879b04d2ea65d331932e9b989'
  }
});