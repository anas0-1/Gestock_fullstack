import authService from '../services/authService';
import axios from '../services/axios';

const state = {
  user: null,
  isAuthenticated: false,
};

const mutations = {
  SET_AUTH(state, user) {
    state.user = user;
    state.isAuthenticated = true;
  },
  LOGOUT(state) {
    state.user = null;
    state.isAuthenticated = false;
  },
};

const actions = {
  async login({ commit }, { email, password }) {
    try {
      const data = await authService.login(email, password);
      const token = data.access_token;
      localStorage.setItem('authToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Handle user data here if available
      commit('SET_AUTH', {}); // Update if user data is available in response
    } catch (error) {
      console.error('Login action error:', error);
      throw new Error('Login failed');
    }
  },

  async register({ commit }, { name, email, password, password_confirmation }) {
    try {
      const data = await authService.register(name, email, password, password_confirmation);
      const token = data.access_token;
      localStorage.setItem('authToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Handle user data here if available
      commit('SET_AUTH', {}); // Update if user data is available in response
    } catch (error) {
      console.error('Register action error:', error);
      throw new Error('Registration failed');
    }
  },

  logout({ commit }) {
    authService.logout();
    commit('LOGOUT');
  }
};

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  user: state => state.user,
};

export default {
  state,
  mutations,
  actions,
  getters
};
