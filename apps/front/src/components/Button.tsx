import { styled } from '../../styled-system/jsx'

export const Button = styled('button', {
  base: {
    paddingX: 4,
    paddingY: 2,
    width: '100%',
    borderRadius: 5,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'gray.300',
    cursor: 'pointer',
    fontWeight: 'medium',
    _hover: {
      backgroundColor: 'gray.200',
      transition: 'ease-in-out',
      transitionDuration: '0.2s',
    },
    _focus: {
      backgroundColor: 'gray.200',
      transition: 'ease-in-out',
      transitionDuration: '0.2s',
    },
    _active: {
      backgroundColor: 'gray.300',
      transition: 'ease-in-out',
      transitionDuration: '0.2s',
    },
    _disabled: {
      backgroundColor: 'gray.700',
      transition: 'ease-in-out',
      transitionDuration: '0.2s',
      cursor: 'not-allowed',
    },
  },
})
