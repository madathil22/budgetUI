import axios from 'axios';

export default axios.create({
  baseURL: `http://localhost:6060/`
});

export const GOOGLEAPI = axios.create({
  baseURL:'https://www.googleapis.com/'
});