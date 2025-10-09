import { create } from 'zustand';

export const useAuthState = create((set) => ({
  authUser: null,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const response = await fetch('http://localhost:1601/auth/check', {
        method: 'GET',
        credentials: 'include',
      });

      const result = await response.json();
      set({ authUser: result._id });
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  setAuthUser: (user) => set({ authUser: user }),
}));
