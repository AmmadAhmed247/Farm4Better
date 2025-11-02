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
  (error) => {
    return Promise.reject(error);
  }
);

export const farmerService = {
  registerFarmer: async (formData) => {
    const response = await api.post('/api/farmer/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  getProfile: async ({ id, email }) => {
    const params = {};
    if (id) params.id = id;
    console.log("Fetching farmer profile with params:", params);
    if (email) params.email = email;
    const response = await api.get(`/api/farmer/profile/${id}`
    );
    return response.data;
  }
  ,
  getMyProfile: async () => {
    const response = await api.get('/api/farmer/me');
    return response.data;
  }
};