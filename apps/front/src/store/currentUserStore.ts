import { create } from 'zustand'

interface CurrentUserState {
  userId: number
  username: string
  displayName: string
  loggedIn: boolean
}

interface CurrentUserActions {
  setUser: (id: number, username: string, displayName: string) => void
  unsetUser: () => void
}

export const useCurrentUserStore = create<CurrentUserState & CurrentUserActions>((set) => ({
  userId: -1,
  username: '',
  displayName: '',
  loggedIn: false,
  setUser: (id, username, displayName) => {
    set({ userId: id, username, displayName, loggedIn: true })
  },
  unsetUser: () => {
    set({ userId: -1, username: '', displayName: '', loggedIn: false })
  },
}))
