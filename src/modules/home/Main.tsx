import { Box, Grid, Flex, Skeleton, Text, Center } from '@chakra-ui/react'
import { useContext } from 'react'

import { MovieCard } from './components/movie-card/MovieCard'
import { SearchMovie } from './components/search-movie/SearchMovie'
import { MoviesContext } from '@/context/MoviesContext'
import { ButtonApp } from '@/components/Button'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

export const Main = () => {
  const {
    infoMovies,
    page,
    beforePage,
    nextPage,
    searchMovie,
    getSearchMovie,
  } = useContext(MoviesContext)

  const amountLoadingCard = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const isDisabledBeforePage = page < 2
  const search = ''

  return (
    <Box p={[4, 7, 10]}>
      <SearchMovie />
      <Grid
        templateColumns="repeat(auto-fit, minmax(220px, 1fr))"
        gap={[5, 10]}
        padding={[4, 8, 10]}
        minHeight={250}
        maxWidth={1500}
        alignItems="center"
        margin="auto"
        justifyItems="center"
      >
        {infoMovies.length > 0 ? (
          infoMovies.map((infoMovie) => {
            if (infoMovie.poster_path) {
              return (
                <MovieCard
                  title={infoMovie.title}
                  imgUrl={infoMovie.poster_path}
                  genreIds={infoMovie.genre_ids}
                  id={infoMovie.id}
                  key={infoMovie.id}
                  voteAverage={infoMovie.vote_average}
                />
              )
            } else {
              return null // ou return undefined;
            }
          })
        ) : infoMovies?.length === 0 && searchMovie === '' ? (
          amountLoadingCard.map((number) => (
            <Skeleton
              w={[280, 240, 220, 240, 270]}
              h={[360, 320, 300, 320, 350]}
              startColor="background.yellow"
              endColor="base.gray200"
              fadeDuration={1}
              borderRadius="lg"
              p={5}
              key={number}
            />
          ))
        ) : (
          <Text
            color="feedback.danger"
            fontSize={30}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            Filme não encontrado
          </Text>
        )}
      </Grid>

      {infoMovies.length > 0 && searchMovie === '' ? (
        <Flex align="center" justify="space-between" p={[2, 6, 10]}>
          <ButtonApp
            background="background.yellow"
            color="base.gray500"
            onClick={beforePage}
            colorHover="#ffce1f"
            isDisabled={isDisabledBeforePage}
            title="Retroceder"
          >
            <AiOutlineArrowLeft />
            Anterior
          </ButtonApp>

          <ButtonApp
            background="background.yellow"
            color="base.gray500"
            onClick={nextPage}
            colorHover="#ffce1f"
            title="Avançar"
          >
            Próxima
            <AiOutlineArrowRight />
          </ButtonApp>
        </Flex>
      ) : (
        <Center>
          <ButtonApp
            background="background.yellow"
            color="base.gray500"
            onClick={() => getSearchMovie(search)}
            colorHover="#ffce1f"
            title="Reiniciar catálogo"
          >
            Catálogo Inicial
          </ButtonApp>
        </Center>
      )}
    </Box>
  )
}
