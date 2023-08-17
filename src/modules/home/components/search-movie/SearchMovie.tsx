import { MoviesContext } from '@/context/MoviesContext'
import { Flex, Input, Button } from '@chakra-ui/react'
import { ChangeEvent, useContext, useState } from 'react'

export const SearchMovie = () => {
  const [searchMovie, setSearchMovie] = useState('')
  const { infoMovies, getFilterInfoMovie } = useContext(MoviesContext)

  const handleSearchMovie = (event: ChangeEvent<HTMLInputElement>) => {
    const eventTagetValue = event.target.value.toLowerCase()
    setSearchMovie(eventTagetValue)
  }

  const searchInfoMovie = () => {
    const filterInfoMovie = infoMovies.filter((movie) =>
      movie.title.toLowerCase().includes(searchMovie),
    )
    getFilterInfoMovie(filterInfoMovie)
  }

  return (
    <Flex align="center" justify="center" p={[2, 4, 6]}>
      <Input
        placeholder="Digite algo..."
        size="lg"
        mr={2}
        bg="background.white"
        focusBorderColor="background.darkBlue"
        color="base.gray400"
        maxW="800px"
        _placeholder={{ color: 'base.gray300' }}
        onChange={handleSearchMovie}
      />
      <Button
        bg="background.darkBlue"
        color="base.gray200"
        size="lg"
        maxWidth="100px"
        onClick={searchInfoMovie}
        _hover={{ boxShadow: '0px 0px 30px 0px #1281c3', bg: '#1281c3' }}
      >
        Buscar
      </Button>
    </Flex>
  )
}
