import axios from 'axios';

export const HTTP = axios.create({
  // baseURL: `https://apiCloud.waterportal.sinka.vn/`,
  baseURL: `https://api.waterportal.sinka.vn/`,
  // baseURL :`http://localhost:80/`,
  headers: {
  },
  responseType: "json",
})