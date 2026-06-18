import axiosInstance from './axiosInstance';

// Auth API
export const authAPI = {
  register: (data) => axiosInstance.post('/api/auth/register', data),
  login: (data) => axiosInstance.post('/api/auth/login', data),
  logout: () => localStorage.removeItem('token'),
};

// Resume API
export const resumeAPI = {
  create: (data) => axiosInstance.post('/api/resumes', data),
  getAll: () => axiosInstance.get('/api/resumes'),
  getById: (id) => axiosInstance.get(`/api/resumes/${id}`),
  getFull: (id) => axiosInstance.get(`/api/resumes/${id}/full`),
  update: (id, data) => axiosInstance.patch(`/api/resumes/${id}`, data),
  updateTemplate: (id, template) => axiosInstance.patch(`/api/resumes/${id}/template`, { template }),
  delete: (id) => axiosInstance.delete(`/api/resumes/${id}`),
  getPDF: (id) => axiosInstance.get(`/api/resumes/${id}/pdf`, { responseType: 'blob' }),
};

// Education API
export const educationAPI = {
  create: (resumeId, data) => axiosInstance.post(`/api/resumes/${resumeId}/educations`, data),
  update: (id, data) => axiosInstance.patch(`/api/educations/${id}`, data),
  delete: (id) => axiosInstance.delete(`/api/educations/${id}`),
};

// Experience API
export const experienceAPI = {
  create: (resumeId, data) => axiosInstance.post(`/api/resumes/${resumeId}/experiences`, data),
  update: (id, data) => axiosInstance.patch(`/api/experiences/${id}`, data),
  delete: (id) => axiosInstance.delete(`/api/experiences/${id}`),
};

// Projects API
export const projectAPI = {
  create: (resumeId, data) => axiosInstance.post(`/api/resumes/${resumeId}/projects`, data),
  update: (id, data) => axiosInstance.patch(`/api/projects/${id}`, data),
  delete: (id) => axiosInstance.delete(`/api/projects/${id}`),
};

// Skills API
export const skillAPI = {
  create: (resumeId, data) => axiosInstance.post(`/api/resumes/${resumeId}/skills`, data),
  update: (id, data) => axiosInstance.patch(`/api/skills/${id}`, data),
  delete: (id) => axiosInstance.delete(`/api/skills/${id}`),
};
