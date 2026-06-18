// Local Storage utilities
export const StorageService = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage set error:', error);
    }
  },

  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Storage remove error:', error);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Storage clear error:', error);
    }
  },

  // Auto-save draft resume
  saveDraft: (resumeId, data) => {
    StorageService.set(`draft_${resumeId}`, {
      data,
      timestamp: new Date().toISOString()
    });
  },

  getDraft: (resumeId) => {
    return StorageService.get(`draft_${resumeId}`);
  },

  clearDraft: (resumeId) => {
    StorageService.remove(`draft_${resumeId}`);
  },
};
