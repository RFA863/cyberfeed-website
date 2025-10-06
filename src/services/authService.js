import api from "./api";

export const loginSrv = async (username, password) => {
  try {

    const response = await api.post('/auth/login', { username, password });
    return response.data.data;

  } catch (error) {
    throw new Error(error.response.data.message || 'Login failed. Please check your credentials.');
  };
};

export const registerSrv = async (username, password) => {
  try {

    const response = await api.post('/auth/register', { username, password });
    return response.data.data;

  } catch (error) {
    if (error.response) {

      throw new Error(error.response.data.message || 'Registration failed. Please try again.');

    } else if (error.request) {

      throw new Error('Cannot connect to the server. Please check your network.');

    } else {

      throw new Error('An unexpected error occurred.');
    }
  };

};

