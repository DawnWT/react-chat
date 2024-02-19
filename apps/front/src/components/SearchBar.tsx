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
      <TextInput
        backgroundColor="#3a3a3a"
        icon={<FontAwesomeIcon icon={faSearch} color="white" />}
        value={input}
        onChange={onChange}
        onKeyDown={onKeyDown}
        error={error}
      />

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
              backgroundColor="#3a3a3a"
              color="white"
              _last={{
                borderBottomRadius: '4px',
              }}
              _hover={{
                cursor: 'pointer',
                backgroundColor: '#4a4a4a',
              }}
              _focus={{
                backgroundColor: '#4a4a4a',
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
