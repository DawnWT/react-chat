import { useCallback, useState } from 'react'

import { useDebounce } from '../hooks/useDebounce'
import { useGetUserList } from '../hooks/useGetUserList'
import { SearchBar } from './SearchBar'

interface UserSearchBarProps {
  onConfirm: (id: number) => void
}

export const UserSearchBar = function ({ onConfirm }: UserSearchBarProps) {
  const [input, setInput] = useState('')
  const debouceInput = useDebounce(input, 300)
  const [error, setError] = useState('')
  const { data } = useGetUserList(debouceInput)

  const onConfirmUser = useCallback((value: number | null) => {
    if (value === null) {
      setError('User not found')
      return
    }

    onConfirm(value)
  }, [])

  return (
    <SearchBar
      onConfirm={onConfirmUser}
      dataList={data?.map((v) => ({ label: v.id_name, value: v.id })) ?? []}
      input={input}
      setInput={setInput}
      error={error}
    />
  )
}
