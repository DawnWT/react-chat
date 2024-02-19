import { useEffect, useState } from 'react'

export const useLocalStorage = function <T>(key: string, value: T) {
  const [item, setItem] = useState(() => {
    const storedValue = localStorage.getItem(key)
    return storedValue ? (JSON.parse(storedValue) as T) : value
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(item))
  }, [item])

  return [item, setItem] as const
}
