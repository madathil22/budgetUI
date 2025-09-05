import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:6060/'

});
API.defaults.headers.post['Content-Type'] = 'application/json';
export default API;


export const GOOGLEAPI = axios.create({
  baseURL: 'https://www.googleapis.com/'
});
