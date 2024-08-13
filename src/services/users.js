import axios from 'axios';

const API_URL = 'http://localhost:8000/api/users';

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('authToken')}`
});

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users: ' + error.message);
  }
};

export const updateUser = async (user) => {
  try {
    const response = await axios.put(`${API_URL}/${user.id}`, user, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update user: ' + error.message);
  }
};

export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_URL}/${userId}`, { headers: authHeader() });
  } catch (error) {
    throw new Error('Failed to delete user: ' + error.message);
  }
};
