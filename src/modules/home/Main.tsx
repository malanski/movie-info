import { Box, Button, Flex, Grid } from '@chakra-ui/react'
import { MovieCard } from './components/movie-card/MovieCard'
import { SearchMovie } from './components/search-movie/SearchMovie'
import { useContext } from 'react'
import { MoviesContext } from '@/context/MoviesContext'

export const Main = () => {
  const { infoMovies, page, beforePage, nextPage } = useContext(MoviesContext)
  const isDisableBeforePage = page < 2
  return (
    <Box p={[4, 7, 10]}>
      <SearchMovie />
      <Grid
        templateColumns="repeat(auto-fit, minmax(220px, 1fr))"
        gap={5}
        p={[4, 8, 10]}
      >
        {infoMovies.map((infoMovies) => (
          <MovieCard
            title={infoMovies.title}
            imgUrl={infoMovies.poster_path}
            genreIds={infoMovies.genre_ids}
            key={infoMovies.id}
            voteAverage={0}
          />
        ))}
      </Grid>

      <Flex align="center" justifyContent="space-between" p={[2, 6, 10]}>
        <Button isDisabled={isDisableBeforePage} onClick={beforePage}>
          Página Anterior
        </Button>
        <Button onClick={nextPage}>Próxima página</Button>
      </Flex>
    </Box>
  )
}
