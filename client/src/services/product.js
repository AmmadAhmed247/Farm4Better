import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

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

export const productService = {
  getAll: async () => {
    const res = await api.get('/api/products');
    return res.data; // { success: true, products }
  },
  
  getById: async (id) => {
    const res = await api.get(`/api/products/${id}`);
    return res.data; // { success: true, product }
  },

  create: async (productData) => {
    const formData = new FormData();
    
    // Add basic product info
    Object.keys(productData).forEach(key => {
      if (key !== 'images') {
        formData.append(key, productData[key]);
      }
    });
    
    // Add images if any
    if (productData.images && productData.images.length > 0) {
      productData.images.forEach(file => {
        formData.append('images', file);
      });
    }

    const res = await api.post('/api/products/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data; // { success: true, product }
  }
};
