import { Box, Card, Flex, Text, CircularProgress } from '@chakra-ui/react'
import {
  AiOutlineHeart,
  AiFillHeart,
  AiFillStar,
  AiOutlineOrderedList,
} from 'react-icons/ai'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { useState } from 'react'
import { TmdbApi } from '@/services/api'

interface IMovie {
  adult: boolean
  backdrop_path: string
  imgUrl: string
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

const CircularIconWithProgressBar = ({ progress, vote }) => {
  return (
    <Box position="relative" display="inline-block">
      <CircularProgress
        value={progress}
        size="72px"
        thickness="8px"
        color="green.400"
        trackColor="gray.200"
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        fontWeight="bold"
        fontSize={30}
      >
        {vote}
      </Box>
    </Box>
  )
}

const HeartIcon = ({ type }) => {
  if (type === 'fill') {
    return <AiFillHeart />
  }

  return <AiOutlineHeart />
}
// eslint-disable-next-line camelcase
const Movie = ({
  adult,
  overview,
  title,
  original_title,
  release_date,
  vote_average,
  popularity,
}: IMovie) => {
  const [iconType, setIconType] = useState('outline')
  const toggleIconType = () => {
    setIconType(iconType === 'outline' ? 'fill' : 'outline')
  }

  return (
    <Flex p="5">
      <Flex
        wrap="nowrap"
        justifyContent="space-between"
        alignItems="center"
        w="30%"
      >
        <Card
          bgImage={`url(https://image.tmdb.org/t/p/w500/lwyleO7PqNNkX66stvANWP01p9I.jpg)`}
          fontWeight="bold"
          borderRadius="lg"
          w="220px"
          p={5}
          m={2}
          h="300px"
          bgSize="cover"
          bgPosition="center"
          as="span"
        ></Card>

        <Card
          bgImage={`url(https://image.tmdb.org/t/p/w500/lwyleO7PqNNkX66stvANWP01p9I.jpg)`}
          fontWeight="bold"
          borderRadius="lg"
          w="220px"
          p={5}
          m={2}
          h="300px"
          bgSize="cover"
          bgPosition="center"
          as="span"
        ></Card>
      </Flex>

      <Flex direction="column" color="white" alignItems="center" w="70%" p={5}>
        <Text fontWeight="bold" as="span" textAlign="center" m={2}>
          <big>{title}</big>
        </Text>

        <Flex
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          p={5}
        >
          <CircularIconWithProgressBar
            progress={vote_average * 10}
            vote={vote_average * 10}
          ></CircularIconWithProgressBar>
          <AiOutlineOrderedList></AiOutlineOrderedList>
          <button onClick={toggleIconType}>
            <HeartIcon type={iconType} />
          </button>
          <BsFillBookmarkFill></BsFillBookmarkFill>
          <AiFillStar></AiFillStar>
          <Text>Data de Lançamento:{release_date}</Text>
        </Flex>

        <Flex
          p={2}
          justifyContent="space-between"
          w="100%"
          border="2px solid white"
          borderRadius="lg"
        >
          <Text alignSelf="flex-start" fontWeight="bold" as="span">
            Conteúdo adulto: {adult}
          </Text>
          <Text alignSelf="flex-start" fontWeight="bold" as="span">
            Gênero: Comédia, Terror
          </Text>
        </Flex>

        <Flex>
          <Text fontWeight="bold" as="span" p="5">
            Descrição:
          </Text>
          <Text fontWeight="normal" as="span" p="5" maxW="800px">
            {overview}
          </Text>
        </Flex>

        <Text p={2} alignSelf="flex-start" fontWeight="bold" as="span">
          Título original: {original_title}
        </Text>

        <Flex
          justifyContent="space-between"
          w="100%"
          p={1}
          alignSelf="flex-start"
          fontWeight="bold"
          as="span"
          border="2px solid white"
          borderRadius="lg"
        >
          <Text p={2} alignSelf="flex-start" fontWeight="bold" as="span">
            Popularidade: {popularity}
          </Text>
          <Text p={2} alignSelf="flex-start" fontWeight="bold" as="span">
            Votos: {vote_average}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = async () => {
  const keyApi = `${process.env.NEXT_PUBLIC_API_KEY}`

  try {
    const genresResponse = await TmdbApi.getListGenres(keyApi)
    const genres = genresResponse.data.genres

    // Replace the following with your actual logic to fetch movie data
    const movieResponse = await TmdbApi.getPopularMovies(8, keyApi)
    const movie = movieResponse.data.results[0] // Change this as needed
    return {
      props: {
        adult: movie.adult,
        overview: movie.overview,
        title: movie.title,
        original_title: movie.original_title,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        popularity: movie.popularity,
        genres, // Pass the genres to the component
      },
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      props: {
        error: 'Failed to fetch data',
      },
    }
  }
}
export default Movie
