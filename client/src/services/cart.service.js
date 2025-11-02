// src/services/cart.service.js
// Create this file in the same directory as your other service files
// (where product.js, farmer.js, and api.js are located)

import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add auth token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const cartService = {
  // Get user's cart
  getCart: async () => {
    const res = await api.get('/api/cart');
    return res.data; // { success: true, cart }
  },

  // Add item to cart
  addToCart: async (productId, quantity = 1) => {
    const res = await api.post('/api/cart/add', { productId, quantity });
    return res.data; // { success: true, message, cart }
  },

  // Update cart item quantity
  updateCartItem: async (productId, quantity) => {
    const res = await api.put('/api/cart/update', { productId, quantity });
    return res.data; // { success: true, message, cart }
  },

  // Remove item from cart
  removeFromCart: async (productId) => {
    const res = await api.delete(`/api/cart/remove/${productId}`);
    return res.data; // { success: true, message, cart }
  },

  // Clear entire cart
  clearCart: async () => {
    const res = await api.delete('/api/cart/clear');
    return res.data; // { success: true, message, cart }
  }
};