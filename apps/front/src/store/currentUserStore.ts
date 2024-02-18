import { create } from 'zustand'

interface CurrentUserState {
  userId: number
  username: string
  displayName: string
  password: string
  loggedIn: boolean
}

interface CurrentUserActions {
  setUser: (id: number, username: string, displayName: string, password: string) => void
  unsetUser: () => void
}

export const useCurrentUserStore = create<CurrentUserState & CurrentUserActions>((set) => ({
  userId: -1,
  username: '',
  displayName: '',
  password: '',
  loggedIn: false,
  setUser: (id, username, displayName, password) => {
    set({ userId: id, username, displayName, password, loggedIn: true })
  },
  unsetUser: () => {
    set({ userId: -1, username: '', displayName: '', password: '', loggedIn: false })
  },
}))
