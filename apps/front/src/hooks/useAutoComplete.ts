import React, { useCallback, useState } from 'react'

export const useAutoComplete = function (
  input: React.MutableRefObject<HTMLInputElement | null>,
  dataList: string[],
  onSearch: (value: string) => void = () => void 0
) {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filteredResults, setFilteredResults] = useState<string[]>([])

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)

    if (term === '') {
      setFilteredResults([])
    } else {
      const filtered = dataList.filter((item) => item.toLowerCase().includes(term.toLowerCase())).slice(0, 6)
      setFilteredResults(filtered)
    }
  }, [])

  const onConfirm = useCallback(
    (value: string) => {
      input.current?.blur()

      onSearch(value)

      setSearchTerm('')
      setFilteredResults([])
    },
    [input]
  )

  const handleEnterPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onConfirm(searchTerm)
      }
    },
    [searchTerm]
  )

  const handleClickOnResult = useCallback((e: React.MouseEvent<HTMLElement>) => {
    onConfirm(e.currentTarget.textContent ?? '')
  }, [])

  return {
    searchTerm,
    filteredResults,
    handleSearch,
    handleEnterPress,
    handleClickOnResult,
  }
}
