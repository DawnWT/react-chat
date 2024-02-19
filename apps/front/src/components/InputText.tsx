import React, { useState } from 'react'
import { css } from '@panda/css'

interface InputTextProps {
  onSubmit: (value: string) => void
}

export const InputText: React.FC<InputTextProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (inputValue.trim() !== '') {
        onSubmit(inputValue)
        setInputValue('')
      }
    }
  }

  return (
    <textarea
      className={css({
        width: '50%',
        padding: '12px',
        resize: 'none',
        outline: 'none',
        borderRadius: 8,
        color: 'white',
        backgroundColor: '#414141',
      })}
      value={inputValue}
      placeholder='Type a message...'
      onChange={handleInputChange}
      onKeyDown={handleKeyPress}
      rows={1}
    />
  )
}
