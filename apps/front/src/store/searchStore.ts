import { create } from 'zustand'

interface SearchState {
  searchValue: string
}

interface SearchActions {
  updateSearchValue: (value: string) => void
}

export const useSearchStore = create<SearchState & SearchActions>((set) => ({
  searchValue: '',
  updateSearchValue: (value) => {
    set({ searchValue: value })
  },
}))
