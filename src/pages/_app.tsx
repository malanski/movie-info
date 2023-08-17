import { ChakraProvider, CSSReset, Box } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

import { theme } from '@/themes'
import { Header } from '@/components/Header'
import { MoviesContextProvider } from '@/context/MoviesContext'
import { Footer } from '@/components/Footer'

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
        <MoviesContextProvider>
          <Header />
          <Component {...pageProps} />
        </MoviesContextProvider>
        <Footer />
      </Box>
    </ChakraProvider>
  )
}
