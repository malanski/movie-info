import { Flex, Card, Heading, Text, CircularProgress } from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import {
  AiOutlineHeart,
  AiFillHeart,
  AiFillStar,
  AiOutlineOrderedList,
} from 'react-icons/ai'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { MoviesContext } from '@/context/MoviesContext'

export const DetailMovie = () => {
  const { query } = useRouter()
  const { infoMovies, mapGenreIdsToNames } = useContext(MoviesContext)

  const queryId =
    typeof query.id === 'string' ? parseInt(query.id, 10) : undefined

  const infoMovie = infoMovies.find((infoMovie) => infoMovie.id === queryId)
  const progressValue = infoMovie?.vote_average
    ? infoMovie.vote_average * 10
    : 0

  const imageUrls = [
    `url(https://image.tmdb.org/t/p/w500/${infoMovie?.poster_path})`,
    `url(https://image.tmdb.org/t/p/w500/${infoMovie?.backdrop_path})`,
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleImageClick = () => {
    const nextIndex = (currentImageIndex + 1) % imageUrls.length
    setCurrentImageIndex(nextIndex)
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
          bgImage={imageUrls[currentImageIndex]}
          fontWeight="bold"
          borderRadius="lg"
          w={400}
          h={400}
          p={5}
          m={2}
          bgSize="cover"
          bgPosition="center"
          as="span"
          onClick={handleImageClick}
        ></Card>
      </Flex>

      <Flex direction="column" color="white" alignItems="center" w="70%" p={5}>
        <Heading fontWeight="bold" as="h1" textAlign="center" m={2}>
          {infoMovie?.title}
        </Heading>

        <Flex
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          p={5}
        >
          <CircularProgress value={progressValue} />
          <AiOutlineHeart />
          <BsFillBookmarkFill></BsFillBookmarkFill>
          <AiFillStar></AiFillStar>
          <Text>{infoMovie?.release_date}</Text>
        </Flex>

        <Flex
          p={2}
          justifyContent="space-between"
          w="100%"
          border="2px solid white"
          borderRadius="lg"
        >
          <Text alignSelf="flex-start" fontWeight="bold" as="span">
            Conteúdo adulto: {infoMovie?.adult ? 'Sim' : 'Não'}
          </Text>
          {infoMovie?.genre_ids &&
            mapGenreIdsToNames(infoMovie?.genre_ids).map((genre) => (
              <Text
                alignSelf="flex-start"
                fontWeight="bold"
                as="span"
                key={genre.id}
              >
                Gênero: {genre.name}
              </Text>
            ))}
        </Flex>

        <Flex>
          <Text fontWeight="bold" as="span" p="5">
            Descrição:
          </Text>
          <Text fontWeight="normal" as="span" p="5" maxW="800px">
            {infoMovie?.overview}
          </Text>
        </Flex>

        <Text p={2} alignSelf="flex-start" fontWeight="bold" as="span">
          Título original: {infoMovie?.original_title}
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
            Popularidade: {infoMovie?.popularity}
          </Text>
          <Text p={2} alignSelf="flex-start" fontWeight="bold" as="span">
            Votos: {infoMovie?.vote_average}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
