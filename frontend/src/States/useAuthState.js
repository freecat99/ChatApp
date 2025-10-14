import { create } from 'zustand'
import { io } from 'socket.io-client'

const BASE_URL = 'http://localhost:1601';

export const useAuthState = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  socket: null,

  checkAuth: async () => {
    try {
      const response = await fetch('http://localhost:1601/auth/check', {
        method: 'GET',
        credentials: 'include',
      });

      const result = await response.json();
      const user = result;
      set({ authUser: user });
      get().connectSocket(user);

    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  connectSocket: () =>{
    const {authUser} = get();
    if(!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id
      }
    });
    socket.connect();
    set({socket:socket});

    socket.on('getOnlineUsers', (onlineUsers) => {
      console.log("Online users:", onlineUsers);
    });

  },
  disconnectSocket: () =>{
    if(get().socket?.connected) get().socket.disconnect();
  },

  setAuthUser: (user) => set({ authUser: user })
}));
