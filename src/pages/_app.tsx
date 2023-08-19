import { ChakraProvider, CSSReset, Box } from '@chakra-ui/react'

import { theme } from '@/themes'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box
        bg="background.black"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        minHeight="100vh"
      >
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Box>
    </ChakraProvider>
  )
}
