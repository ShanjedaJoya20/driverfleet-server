import axios from 'axios';

const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    const url = import.meta.env.VITE_API_URL.replace(/\/+$/, '');
    return url.endsWith('/api') ? url : url + '/api';
  }
  if (import.meta.env.PROD) {
    return 'https://driverfleet-server.vercel.app/api';
  }
  return 'http://localhost:5000/api';
};

const API = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: { 'Cache-Control': 'no-cache' },
});

export default API;
