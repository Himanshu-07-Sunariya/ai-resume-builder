import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      setAuth: (token, user) =>
        set({ token, user, isAuthenticated: !!(token && user) }),
      setUser: (user) =>
        set((state) => ({ user, isAuthenticated: !!(state.token && user) })),
      setToken: (token) =>
        set((state) => ({ token, isAuthenticated: !!(token && state.user) })),
      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null, token: null, isAuthenticated: false });
      },

      initFromStorage: () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (!token || !user || user === 'undefined') return;

        try {
          const parsedUser = JSON.parse(user);
          if (parsedUser) {
            set({ token, user: parsedUser, isAuthenticated: true });
          }
        } catch {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);

export const useResumeStore = create((set) => ({
  resumes: [],
  currentResume: null,
  
  setResumes: (resumes) => set({ resumes }),
  setCurrentResume: (resume) => set({ currentResume: resume }),
  addResume: (resume) => set((state) => ({ resumes: [...state.resumes, resume] })),
  updateResume: (id, resume) =>
    set((state) => ({
      resumes: state.resumes.map((r) => (r.id === id ? resume : r)),
      currentResume: state.currentResume?.id === id ? resume : state.currentResume,
    })),
  deleteResume: (id) =>
    set((state) => ({
      resumes: state.resumes.filter((r) => r.id !== id),
      currentResume: state.currentResume?.id === id ? null : state.currentResume,
    })),
}));

export const useUIStore = create((set) => ({
  showSidebar: true,
  loading: false,
  error: null,
  
  setSidebar: (show) => set({ showSidebar: show }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
