import {
  Flex,
  Heading,
  Text,
  CircularProgress,
  Button,
  Box,
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { AiOutlineHeart, AiFillHeart, AiFillStar } from 'react-icons/ai'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { MoviesContext } from '@/context/MoviesContext'
import { format } from 'date-fns'

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
    <Flex direction="column" p="5">
      <Flex justifyContent="space-between" width="100%">
        <Button>Previous</Button>
        <Button>Next</Button>
      </Flex>

      <Flex>
        <Flex
          wrap="nowrap"
          justifyContent="space-between"
          alignItems="center"
          w="30%"
        >
          <Box
            sx={{
              width: '400px',
              height: '400px',
              perspective: '1000px',
              transition: 'transform 0.6s ease',
              transform: currentImageIndex === 1 ? 'rotateY(360deg)' : 'none',
            }}
            bgImage={imageUrls[currentImageIndex]}
            fontWeight="bold"
            p={5}
            m={2}
            bgSize="auto 100%"
            bgRepeat="no-repeat"
            bgPosition="center"
            title="Poster do filme"
            onClick={handleImageClick}
          ></Box>
        </Flex>

        <Flex
          direction="column"
          color="white"
          alignItems="center"
          w="70%"
          p={5}
        >
          <Heading fontWeight="bold" as="h1" textAlign="center" m={2}>
            {infoMovie?.title}
          </Heading>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            p={5}
          >
            <CircularProgress value={progressValue}>
              <Text
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                fontSize="md"
                fontWeight="bold"
              >
                <big>{progressValue}</big>
                <small>%</small>
              </Text>
            </CircularProgress>
            <AiOutlineHeart />
            <BsFillBookmarkFill></BsFillBookmarkFill>
            <AiFillStar></AiFillStar>

            <Text fontWeight="bolder" color="base.yellow500" fontSize={18}>
              Data de lançamento:{' '}
              <Text
                as="span"
                fontWeight="bold"
                color="base.gray100"
                fontSize={16}
              >
                {infoMovie?.release_date
                  ? format(new Date(infoMovie.release_date), 'dd/MM/yyyy')
                  : 'Data de lançamento indisponível'}
              </Text>
            </Text>
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

            <Flex w={'50%'} >
              {infoMovie?.genre_ids &&
                mapGenreIdsToNames(infoMovie?.genre_ids).map((genre) => (
                  <Text
                    alignSelf="flex-start"
                    fontWeight="bold"
                    as="span"
                    key={genre.id}
                    p={1}
                    borderRadius="lg"
                    fontSize={16}
                    bg={`genres.${genre.id}`}
                  >
                    {genre.name}
                  </Text>
                ))}
            </Flex>
          </Flex>

          <Flex>
            <Text fontWeight="bold" as="span" p="5">
              Sinopse:
            </Text>
            <Text fontWeight="normal" as="span" p="5" maxW="800px">
              {infoMovie?.overview
                ? infoMovie.overview
                : `Ainda não temos uma descrição e nem sinopse para o filme ${infoMovie?.title}`}
            </Text>
          </Flex>

          <Text p={5} alignSelf="flex-start" fontWeight="bold" as="span">
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
    </Flex>
  )
}
