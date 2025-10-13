import { create } from 'zustand'

export const useChatState = create((set) => ({
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
    }))
  }
))
