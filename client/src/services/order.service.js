// services/order.service.js
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // replace with your backend URL

const api = axios.create({
  baseURL: `${API_URL}/orders`,
  withCredentials: true, // to include cookies if using auth
});

// Create a new order
export const createOrder = async (deliveryAddress, paymentMethod) => {
  const response = await api.post('/create', { deliveryAddress, paymentMethod });
  return response.data;
};

// Get all orders for the current user
export const getOrders = async (filters = {}) => {
  const params = {};

  if (filters.status) params.status = filters.status;
  if (filters.search) params.search = filters.search;

  const response = await api.get('/', { params });
  return response.data;
};

// Get a single order by ID
export const getOrderById = async (orderId) => {
  const response = await api.get(`/${orderId}`);
  return response.data;
};

// Cancel an order
export const cancelOrder = async (orderId) => {
  const response = await api.put(`/${orderId}/cancel`);
  return response.data;
};

// Export as a service object
export const orderService = {
  createOrder,
  getOrders,
  getOrderById,
  cancelOrder
};
