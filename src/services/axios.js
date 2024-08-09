import axios from 'axios';

// Set up the base URL for your API
const instance = axios.create({
  baseURL: 'http://localhost:8000/api', // Replace with your actual backend URL
});

export default instance;
