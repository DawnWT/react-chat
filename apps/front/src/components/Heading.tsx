import { styled } from '../../styled-system/jsx'

export const Heading = styled('h1', {
  base: {
    fontSize: `3rem`,
    fontWeight: 'medium',
  },
  variants: {
    align: {
      center: {
        textAlign: 'center',
      },
      start: {
        textAlign: 'start',
      },
    },
  },
})
