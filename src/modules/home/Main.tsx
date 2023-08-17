import { Box, Button, Grid, Flex, Skeleton } from '@chakra-ui/react'
import { useContext } from 'react'

import { MovieCard } from './components/movie-card/MovieCard'
import { SearchMovie } from './components/search-movie/SearchMovie'
import { MoviesContext } from '@/context/MoviesContext'

export const Main = () => {
  const { infoMovies, page, beforePage, nextPage, filterInfoMovie } = useContext(MoviesContext)

  const amountLoadingCard = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const isDisabledBeforePage = page < 2

  return (
    <Box p={[4, 7, 10]}>
      <SearchMovie />
      <Grid
        templateColumns="repeat(auto-fit, minmax(220px, 1fr))"
        gap={5}
        p={[4, 8, 10]}
      >
        {infoMovies.length > 0 && filterInfoMovie.length < 1
          ? infoMovies.map((infoMovie) => (
              <MovieCard
                title={infoMovie.title}
                imgUrl={infoMovie.poster_path}
                genreIds={infoMovie.genre_ids}
                id={infoMovie.id}
                key={infoMovie.id}
                voteAverage={infoMovie.vote_average}
              />
            ))
          : filterInfoMovie.length > 0
          ? filterInfoMovie.map((infoMovie) => (
              <MovieCard
                title={infoMovie.title}
                imgUrl={infoMovie.poster_path}
                genreIds={infoMovie.genre_ids}
                id={infoMovie.id}
                key={infoMovie.id}
                voteAverage={infoMovie.vote_average}
              />
            ))
          : amountLoadingCard.map((number) => (
              <Skeleton
                w="220px"
                h="300px"
                startColor="background.yellow"
                endColor="base.gray200"
                fadeDuration={1}
                borderRadius="lg"
                p={5}
                key={number}
              />
            ))}
      </Grid>

      <Flex align="center" justify="space-between" p={[2, 6, 10]}>
        <Button
          isDisabled={isDisabledBeforePage}
          onClick={beforePage}
          bg="background.yellow"
          color="base.gray500"
          padding="1rem 1.7rem"
          _hover={{
            bg: '#ffce1f',
            fontWeight: 'bolder',
            letterSpacing: '1px',
          }}
        >
          Página anterior
        </Button>

        <Button
          onClick={nextPage}
          bg="background.yellow"
          color="base.gray500"
          padding="1rem 1.7rem"
          _hover={{
            bg: '#ffce1f',
            fontWeight: 'bolder',
            letterSpacing: '1px',
          }}
        >
          Próxima página
        </Button>
      </Flex>
    </Box>
  )
}
