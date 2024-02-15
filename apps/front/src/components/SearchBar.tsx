import '../styles/SearchBar.css'

import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback } from 'react'

import { css } from '../../styled-system/css'

type dataListValueType = number | string

interface SearchBarProps<T extends dataListValueType> {
  onConfirm: (value: T | null) => void
  dataList: Array<{ label: string; value: T }>
  input: string
  setInput: (value: string) => void
  error: string
}

const searchWidth = '100%'
const containerPadding = 10

export const SearchBar = <T extends dataListValueType>({
  onConfirm,
  dataList,
  input,
  setInput,
  error,
}: SearchBarProps<T>) => {
  const handleChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    setInput(ev.target.value)
  }, [])

  const handleEnterKey = useCallback((ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Enter') {
      onConfirm(dataList.find((v) => v.label === ev.currentTarget.value)?.value ?? null)
      setInput('')
    }
  }, [])

  const handleClickOnResult = useCallback((id: T) => {
    onConfirm(id)
    setInput('')
  }, [])

  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        width: '100%',
        margin: `${containerPadding}px`,
        paddingX: '10px',
        height: '50px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        borderColor: error ? 'red' : '#ccc',
      })}
    >
      <FontAwesomeIcon icon={faSearch} />
      <input
        className={css({
          flexGrow: 1,
          height: '100%',
          _focus: {
            outline: 'none',
          },
        })}
        type="text"
        placeholder="Recherchez ..."
        onChange={handleChange}
        onKeyDown={handleEnterKey}
      />

      {dataList.length > 0 && input.length > 0 && (
        <ul
          className={css({
            position: 'absolute',
            width: `calc(${searchWidth} - ${containerPadding * 2}px)`,
            padding: 0,
            margin: 0,
            left: `${containerPadding}px`,
            top: '60px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderTop: 'none',
            borderRadius: '0 0 4px 4px',
            boxSizing: 'border-box',
            zIndex: 1,
            listStyle: 'none',
          })}
        >
          {dataList.map((result, index) => (
            <li
              className={css({
                padding: '8px 16px',
                cursor: 'pointer',
                _hover: {
                  backgroundColor: '#f3f3f3',
                },
                _focus: {
                  backgroundColor: '#f3f3f3',
                },
              })}
              tabIndex={0}
              key={index}
              onClick={() => {
                handleClickOnResult(result.value)
              }}
            >
              {result.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
