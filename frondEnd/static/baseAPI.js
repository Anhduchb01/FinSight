import axios from 'axios';

export const HTTP = axios.create({
  baseURL :`http://api.finsight.anhduc.site/`,
  headers: {
  },
  responseType: "json",
})