import { create } from 'zustand'
import { useAuthState } from './useAuthState';

export const useChatState = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,

  isUsersLoading: false,
  isMssgsLoading: false,

  setUserLoad: (status, fetchedUsers) =>
    set({
      users: fetchedUsers,
      isUsersLoading: status,
    }),

  setMssgLoad: (status, fetchedMssgs) =>
    set({
      messages: fetchedMssgs,
      isMssgsLoading: status,
    }),

  setSelectedUser: (user) => 
    set({
      selectedUser: user
    }),

  setMssg:(data) =>
    set(state=>({
      messages:[...state.messages, data]
    })),

  subscribeToMessages: () => {
    const{ selectedUser } = get();
    if(!selectedUser) return;
    
    const socket = useAuthState.getState().socket;

    socket.on('newMessage', (newMessage) => {
      set({
        messages: [...get().messages, newMessage]
      })
    })

  },

  unsubscribeToMessages: () => {
    const{ selectedUser } = get();
    if(!selectedUser) return;
    
    const socket = useAuthState.getState().socket;

    socket.off('newMessage');

  }
    
  }
))
