import '../styles/SearchBar.css'

import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef } from 'react'

import { css } from '../../styled-system/css'
import { useAutoComplete } from '../hooks/useAutoComplete'
import { useGetUserList } from '../hooks/useGetUserList'

interface SearchBarProps {
  onConfirm: (value: string) => void
}

const searchWidth = '100%'
const containerPadding = 10

export const SearchBar: React.FC<SearchBarProps> = ({ onConfirm }) => {
  const { data } = useGetUserList({ nameLike: '' })
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { filteredResults, handleClickOnResult, handleEnterPress, handleSearch, searchTerm } = useAutoComplete(
    inputRef,
    data?.map((user) => user.name) ?? [],
    onConfirm
  )

  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        margin: `${containerPadding}px`,
        paddingX: '10px',
        height: '50px',
        border: '1px solid #ccc',
        borderRadius: '4px',
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
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleEnterPress}
        ref={inputRef}
      />

      {filteredResults.length > 0 && (
        <ul
          className={css({
            position: 'absolute',
            width: `calc(${searchWidth} - ${containerPadding * 2}px)`,
            padding: 0,
            margin: 0,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderTop: 'none',
            borderRadius: '0 0 4px 4px',
            boxSizing: 'border-box',
            zIndex: 1,
            listStyle: 'none',
          })}
        >
          {filteredResults.map((result, index) => (
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
              onClick={handleClickOnResult}
            >
              {result}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
