import axios from 'axios';

const API_URL = 'http://localhost:5000/item';

// get items
const getItems = async () => {
  const response = await axios.get(API_URL);
  if (response.data) {
    localStorage.setItem('items', JSON.stringify(response.data.data));
  }
  return response.data;
};

// Create new item
const createItem = async (itemData, token) => {
  const config = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axios.post(API_URL, itemData, config);
  if (response.data) {
    localStorage.setItem('item', JSON.stringify(response.data.data));
  }
  return response.data;
};

// Get a single item via id
const getItem = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  if (response.data) {
    localStorage.setItem('item', JSON.stringify(response.data.data));
  }
  return response.data;
};

const updateItem = async (itemData, token) => {
  const { id } = itemData;
  const config = {
    headers: {
      Authorization: token,
    },
  };
  console.log('item update service');
  const response = await axios.put(`${API_URL}/${id}`, itemData, config);

  if (response.data) {
    localStorage.setItem('item', JSON.stringify(response.data.data));
  }
  return response.data;
};

const deleteItem = async (id, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.delete(`${API_URL}/${id}`, config);
  if (response.data) {
    localStorage.removeItem('item');
  }
  return response.data;
};

const itemService = {
  getItems,
  createItem,
  getItem,
  updateItem,
  deleteItem,
};

export default itemService;
