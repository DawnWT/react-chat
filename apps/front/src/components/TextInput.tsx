import React, { useRef } from 'react'

import { HStack, styled } from '../../styled-system/jsx'

interface TextInputProps
  extends Pick<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onKeyDown' | 'placeholder'> {
  error?: boolean
  icon?: JSX.Element
  iconPos?: 'left' | 'right'
}

const StyledInput = styled('input', {
  base: {
    flexGrow: 1,
    height: '100%',
    _focus: {
      outline: 'none',
    },
  },
})

export const TextInput = styled(function ({
  error,
  icon,
  iconPos = 'left',
  onChange,
  onKeyDown,
  placeholder,
  ...rest
}: TextInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <>
      <HStack
        alignItems="center"
        gap="10px"
        maxHeight="50px"
        paddingX="10px"
        paddingY="5px"
        borderWidth="1px"
        borderStyle="solid"
        borderRadius="4px"
        borderColor={error ? 'red' : 'gray.400'}
        {...rest}
        onClick={() => inputRef.current?.focus()}
      >
        {iconPos === 'left' && icon}
        <StyledInput type="text" onChange={onChange} onKeyDown={onKeyDown} placeholder={placeholder} ref={inputRef} />
        {iconPos === 'right' && icon}
      </HStack>
    </>
  )
})
