import axios from './axios';

const login = async (email, password) => {
  try {
    const response = await axios.post('/login', { email, password });
    return response.data; // Should include `access_token` and `token_type`
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Login failed');
  }
};

const register = async (name, email, password, password_confirmation) => {
  try {
    const response = await axios.post('/register', { name, email, password, password_confirmation });
    return response.data; // Should include `access_token` and `token_type`
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error('Registration failed');
  }
};

const logout = () => {
  localStorage.removeItem('authToken');
  delete axios.defaults.headers.common['Authorization'];
};

export default {
  login,
  register,
  logout
};
