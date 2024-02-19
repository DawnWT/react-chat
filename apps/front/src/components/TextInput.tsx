import { HStack, styled, VStack } from '@panda/jsx'
import React, { useRef } from 'react'

interface TextInputProps
  extends Pick<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onKeyDown' | 'placeholder' | 'value' | 'id'> {
  error?: boolean
  icon?: JSX.Element
  iconPos?: 'left' | 'right'
  isPassword?: boolean
  label?: string
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
  value,
  isPassword = false,
  label,
  id,
  ...rest
}: TextInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <VStack gap={1}>
      {label && (
        <styled.label htmlFor={id} alignSelf="start" color="white">
          {label}
        </styled.label>
      )}
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
        <StyledInput
          width="100%"
          backgroundColor="inherit"
          color="white"
          type={isPassword ? 'password' : 'text'}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          value={value}
          id={id}
          ref={inputRef}
        />
        {iconPos === 'right' && icon}
      </HStack>
    </VStack>
  )
})
