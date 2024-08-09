import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Adjust if needed

// Login function
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    localStorage.setItem('authToken', response.data.token); // Store token
    return response.data;
  } catch (error) {
    throw new Error('Login failed: ' + error.response.data.message);
  }
};

// Register function
// src/services/userService.js
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Registration failed: ' + error.response.data.message);
  }
};
