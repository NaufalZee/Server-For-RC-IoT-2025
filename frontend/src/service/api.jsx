import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api', // Ganti kalau sudah dihosting
});

export const getTelemetry = () => API.get('/telemetry');
export const postLogin = (data) => API.post('/Login', data);
