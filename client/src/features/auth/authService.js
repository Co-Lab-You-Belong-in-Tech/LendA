import axios from 'axios';

const API_URL = 'http://localhost:5000/user';

// Register User
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);

  if (response.data) {
    localStorage.setItem('currentUser', JSON.stringify(response.data.data));
  }

  return response.data;
};

// Login User
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.data) {
    localStorage.setItem('currentUser', JSON.stringify(response.data.data));
  }

  return response.data;
};

// Get User
const getUser = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.data));
  }

  return response.data;
};

// Update User
const updateUser = async (id, userData, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.put(`${API_URL}/${id}`, userData, config);

  if (response.data) {
    localStorage.setItem(
      'currentUser',
      JSON.stringify(response.data.data, token)
    );
  }
  return response.data;
};

const deleteUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.delete(`${API_URL}/${id}`, config);
  if (response.data) {
    localStorage.removeItem('currentUser');
  }
  return response.data;
};

const authService = {
  register,
  login,
  getUser,
  updateUser,
  deleteUser,
};

export default authService;
