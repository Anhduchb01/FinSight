import axios from 'axios';

export const HTTP = axios.create({
  baseURL :`http://localhost:1234/`,
  headers: {
  },
  responseType: "json",
})