import axios from 'axios';

const API_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');

        const { data } = await axios.post(`${API_URL}/auth/refresh-token`, { refreshToken });

        localStorage.setItem('accessToken', data.token);

        api.defaults.headers.common['Authorization'] = data.token;
        return api(originalRequest);

      } catch (refreshError) {

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login'; // Redirect ke halaman login
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;