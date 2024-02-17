import { styled } from '@panda/jsx'
import { Link } from 'react-router-dom'

export const ALink = styled(Link, {
  base: {
    _hover: {
      textDecoration: 'underline',
    },
  },
})
