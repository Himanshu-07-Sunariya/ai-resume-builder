export const RESUME_TEMPLATES = [
  { id: 'modern', name: 'Modern', description: 'Clean and contemporary design' },
  { id: 'minimal', name: 'Minimal', description: 'Simple and professional' },
  { id: 'developer', name: 'Developer', description: 'Perfect for tech professionals' },
];

export const SECTIONS = [
  { id: 'personal', label: 'Personal Information', required: true },
  { id: 'summary', label: 'Professional Summary', required: false },
  { id: 'education', label: 'Education', required: false },
  { id: 'experience', label: 'Experience', required: false },
  { id: 'projects', label: 'Projects', required: false },
  { id: 'skills', label: 'Skills', required: false },
];

export const FORM_ERRORS = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email',
  WEAK_PASSWORD: 'Password must be at least 8 characters',
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  FILE_TOO_LARGE: 'File is too large',
};

export const API_TIMEOUT = 30000; // 30 seconds
export const LOCAL_STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  DRAFT_RESUME: 'draftResume',
};
