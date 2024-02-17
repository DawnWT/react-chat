import { styled, VStack } from '@panda/jsx'

export const Card = styled(VStack, {
  base: {
    gap: 4,
    padding: 5,
    borderRadius: 10,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'gray.300',
    boxShadow: 'xl',
  },
  variants: {
    align: {
      start: {
        alignItems: 'start',
      },
      end: {
        alignItems: 'end',
      },
    },
  },
})
