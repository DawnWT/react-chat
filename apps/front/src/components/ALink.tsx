import { Link } from 'react-router-dom'

import { styled } from '../../styled-system/jsx'

export const ALink = styled(Link, {
  base: {
    _hover: {
      textDecoration: 'underline',
    },
  },
})
