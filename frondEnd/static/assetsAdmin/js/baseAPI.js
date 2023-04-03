import axios from 'axios';

export const HTTP = axios.create({
  // baseURL: `http://localhost/`,
  baseURL: `https://apicloud.waterportal.sinka.vn/`,
  headers: {
        
    
  },
  responseType: "json",
})