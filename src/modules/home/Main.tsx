import { Box, Button, Grid } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { MovieCard } from './components/movie-card/MovieCard'
import { SearchMovie } from './components/search-movie/SearchMovie'
import { TmdbApi } from '@/services/api'

interface IMovies {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export const Main = () => {
  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState<IMovies[]>([])

  useEffect(() => {
    const keyApi = `${process.env.NEXT_PUBLIC_API_KEY}`

    TmdbApi.getPopularMovies(page, keyApi).then(({ data }) => {
      setMovies(data.results)
    })
  }, [page])

  console.log(movies)

  return (
    <Box p={[4, 7, 10]}>
      <SearchMovie />
      <Grid
        templateColumns="repeat(auto-fit, minmax(220px, 1fr))"
        gap={5}
        p={[4, 8, 10]}
      >
        {movies.map((movie) => (
          <MovieCard
            title={movie.title}
            imgUrl={movie.poster_path}
            genreIds={movie.genre_ids}
            key={movie.id}
          />
        ))}
      </Grid>

      <Button onClick={() => setPage((prevState) => prevState + 1)}>
        Próxima página
      </Button>
    </Box>
  )
}
