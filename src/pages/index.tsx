import { MoviesContextProvider } from '@/context/MoviesContext'
import { Main } from '../modules/home/Main'
import Head from 'next/head'

export default function Home() {
  return (
    <MoviesContextProvider>
      <Head>
        <title>Catálogo Inicial</title>
      </Head>
      <Main />
    </MoviesContextProvider>
  )
}
