import { create } from 'zustand'

export const useChatState = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,

  isUsersLoading: false,
  isMessagesLoading: false,

  setUserLoad: (status, fetchedUsers) =>
    set({
      users: fetchedUsers,
      isUsersLoading: status,
    }),

  setMssgLoad: (status, fetchedMssgs) =>
    set({
      messages: fetchedMssgs,
      isMessagesLoading: status,
    }),
  setSelectedUser: (user) => {
    set({
      selectedUser: user
    })
  }
}))
