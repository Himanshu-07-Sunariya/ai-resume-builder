import axiosInstance from './axiosInstance';
import { useToast } from '../hooks/useToast';

// Setup axios interceptor for errors
export const setupInterceptors = () => {
  axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/auth/login';
      }

      const message = error.response?.data?.message || error.message;
      console.error('API Error:', message);
      return Promise.reject(error);
    }
  );
};

// Retry logic for failed requests
export const retryRequest = async (fn, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// Batch requests
export const batchRequests = (requests) => {
  return Promise.all(requests);
};

// Cancel request token
export let cancelTokenSource = axiosInstance.CancelToken.source();

export const cancelAllRequests = () => {
  cancelTokenSource.cancel('Operations canceled');
  cancelTokenSource = axiosInstance.CancelToken.source();
};
