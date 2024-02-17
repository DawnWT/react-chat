import { useDebounce } from '@src/hooks/useDebounce'
import { useGetUserList } from '@src/hooks/useGetUserList'
import React, { useCallback, useMemo, useState } from 'react'

import { SearchBar } from './SearchBar'

interface UserSearchBarProps {
  onConfirm: (id: number) => void
}

export const UserSearchBar = function ({ onConfirm }: UserSearchBarProps) {
  const [input, setInput] = useState('')
  const debouceInput = useDebounce(input, 300)
  const [error, setError] = useState(false)
  const { data } = useGetUserList(debouceInput)
  const parsedData = useMemo(() => data?.map((v) => ({ label: v.id_name, value: v.id })) ?? [], [data])

  const handleChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    setInput(ev.target.value)
  }, [])

  const handleEnterKey = useCallback(
    (ev: React.KeyboardEvent<HTMLInputElement>) => {
      if (ev.key === 'Enter') {
        const selected = parsedData.find((v) => v.label === input)

        if (selected === undefined) {
          setError(true)
          return
        }

        onConfirm(selected.value)
      }
    },
    [parsedData, input]
  )

  const handleClickSuggestion = useCallback(
    (ev: React.MouseEvent<HTMLElement>) => {
      const selected = parsedData.find((v) => v.label === ev.currentTarget.textContent)

      if (selected === undefined) {
        setError(true)
        return
      }

      onConfirm(selected.value)
    },
    [parsedData]
  )

  return (
    <SearchBar
      onChange={handleChange}
      onKeyDown={handleEnterKey}
      onClickSuggestion={handleClickSuggestion}
      dataList={parsedData}
      input={input}
      error={error}
    />
  )
}
