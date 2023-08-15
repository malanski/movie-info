import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    base: {
      gray100: '#F2F2F2',
      gray200: '#D9D9D9',
      gray300: '#808080',
      gray400: '#333333',
      gray500: '#262626',
      gray600: '#1A1A1A',
    },
    background: {
      darkBlue: '#113b54',
      black: '#161616',
      white: '#FFFFFF',
    },
    feedback: {
      danger: '#E25858',
    },
  },
})
