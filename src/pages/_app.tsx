import { ChakraProvider, CSSReset, Box } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

import { theme } from '@/themes'
import { Header } from '@/components/Header'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box bg="background.black" minHeight="100vh">
        <Header />
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}