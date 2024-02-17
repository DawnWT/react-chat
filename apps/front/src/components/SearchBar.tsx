import '@src/styles/SearchBar.css'

import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, styled } from '@panda/jsx'
import React from 'react'

import { TextInput } from './TextInput'

type dataListValueType = number | string

interface SearchBarProps<T extends dataListValueType> {
  dataList: Array<{ label: string; value: T }>
  input: string
  error: boolean
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (ev: React.KeyboardEvent<HTMLInputElement>) => void
  onClickSuggestion: (ev: React.MouseEvent<HTMLElement>) => void
}

export const SearchBar = function <T extends dataListValueType>({
  dataList,
  input,
  error,
  onChange,
  onKeyDown,
  onClickSuggestion,
}: SearchBarProps<T>) {
  return (
    <Box position="relative" width="100%">
      <TextInput icon={<FontAwesomeIcon icon={faSearch} />} onChange={onChange} onKeyDown={onKeyDown} error={error} />

      {dataList.length > 0 && input.length > 0 && (
        <styled.ul
          position="absolute"
          width="100%"
          borderWidth="1px"
          borderStyle="solid"
          borderRadius="4px"
          borderTopRadius="0"
          borderTopWidth="initial"
          borderTopColor="transparent"
          zIndex={1}
          listStyle="none"
        >
          {dataList.map((result, index) => (
            <styled.li
              paddingX="16px"
              paddingY="8px"
              _last={{
                borderBottomRadius: '4px',
              }}
              _hover={{
                backgroundColor: '#f3f3f3',
              }}
              _focus={{
                backgroundColor: '#f3f3f3',
              }}
              tabIndex={0}
              key={index}
              onClick={onClickSuggestion}
            >
              {result.label}
            </styled.li>
          ))}
        </styled.ul>
      )}
    </Box>
  )
}
