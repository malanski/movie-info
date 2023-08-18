import {
  Heading,
  Text,
  CircularProgress,
  Center,
  Flex,
  Box,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import { IMovieDetailsInfo } from '@/services/api.types'

import {
  AiOutlineHeart,
  AiFillHeart,
  AiFillStar,
  AiOutlineArrowLeft,
} from 'react-icons/ai'
import { BsFillBookmarkFill } from 'react-icons/bs'
import Link from 'next/link'
import { ButtonApp } from '@/components/Button'
import Head from 'next/head'
import Image from 'next/image'
import { TmdbApi } from '@/services/api'
import { useState } from 'react'

export const DetailMovie = () => {
  const { query } = useRouter()
  const [movieDetailsInfo, setMovieDetailsInfo] = useState<IMovieDetailsInfo>()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const queryId =
    typeof query.id === 'string' ? parseInt(query.id, 10) : undefined

  if (typeof queryId === 'number') {
    TmdbApi.getMovie(queryId).then(({ data }) => setMovieDetailsInfo(data))
  }
  const progressValue = movieDetailsInfo?.vote_average
    ? movieDetailsInfo.vote_average * 10
    : 0

  const imageUrls = [
    `https://image.tmdb.org/t/p/w500/${movieDetailsInfo?.poster_path}`,
    `https://image.tmdb.org/t/p/w500/${movieDetailsInfo?.backdrop_path}`,
  ]
  const handleImageClick = () => {
    const nextIndex = (currentImageIndex + 1) % imageUrls.length
    setCurrentImageIndex(nextIndex)
  }

  return (
    <>
      <Head>
        <title>{movieDetailsInfo?.title}</title>
      </Head>
      <Box position="relative">
        <Flex
          p={[2, 4, 8]}
          wrap="nowrap"
          flexDirection={['column', 'column', 'column', 'column', 'row']}
          justify={['center', 'center', 'space-between']}
          alignItems="center"
        >
          <Flex
            w={['100%', '70%', '80%', '30%']}
            justifyContent="center"
            alignItems="center"
          >
            <Image
              onClick={handleImageClick}
              title={`Imagens do filme ${movieDetailsInfo?.title}`}
              alt={`Imagens do filme ${movieDetailsInfo?.title}`}
              src={imageUrls[currentImageIndex]}
              style={{
                perspective: '1000px',
                margin: '2px',
                transition: 'transform 0.6s ease',
                transform: currentImageIndex === 1 ? 'rotateY(360deg)' : 'none',
              }}
              width={400}
              height={400}
            ></Image>
          </Flex>

          <Flex
            display={['column', 'column', 'column', 'row']}
            alignItems="center"
            w={['100%', '100%', '100%', '70%']}
            color="white"
            p={[2, 4, 8]}
          >
            <Heading
              as="h1"
              fontWeight="bold"
              textAlign={['left', 'center', 'center', 'right']}
              m={2}
              p={5}
              fontSize={['lg', 'lg', 'lg', '25px', '35px']}
            >
              {movieDetailsInfo?.title}
            </Heading>
            <Text
              as="span"
              p={5}
              m={2}
              alignSelf="flex-start"
              textAlign={['left', 'left', 'center', 'left']}
              fontSize={['md', 'lg', 'lg', '19px', '23px']}
              fontWeight="bold"
            >
              <small>Título original:</small>{' '}
              <i>{movieDetailsInfo?.original_title}</i>
            </Text>

            <Flex
              wrap="wrap"
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
                  {Math.floor(progressValue)}
                </Text>
              </CircularProgress>

              <AiFillStar></AiFillStar>
              <Text
                p={2}
                fontWeight="bolder"
                color="base.yellow500"
                fontSize={18}
              >
                Estreia:&ensp;
                <Text
                  as="span"
                  fontWeight="bold"
                  color="base.gray100"
                  fontSize={16}
                >
                  {movieDetailsInfo?.release_date
                    ? format(
                        new Date(movieDetailsInfo.release_date),
                        'dd/MM/yyyy',
                      )
                    : 'Data de estreia indisponível'}
                </Text>
              </Text>
            </Flex>
            <Flex
              wrap="wrap"
              justifyContent="space-between"
              w="100%"
              p={2}
              border="2px solid white"
              borderRadius="lg"
              marginBottom={['1', '2', '4', '8', '8']}
            >
              <Text as="span" alignSelf="flex-start" fontWeight="bold">
                Conteúdo adulto: {movieDetailsInfo?.adult ? 'Sim' : 'Não'}
              </Text>
              <Flex alignSelf="end" gap={2} wrap="wrap">
                {movieDetailsInfo?.genres.map((genre, index) => {
                  if (index < 5) {
                    return (
                      <Text
                        as="span"
                        key={genre.id}
                        bg={`genres.${genre.id}`}
                        p={1}
                        borderRadius="lg"
                        fontSize={16}
                        alignSelf="flex-start"
                        fontWeight="bold"
                      >
                        {genre.name}
                      </Text>
                    )
                  }
                  return null
                })}
              </Flex>
            </Flex>
            <Flex
              as="span"
              w="100%"
              p={1}
              alignSelf="flex-start"
              justifyContent="space-between"
              fontWeight="bold"
              border="2px solid white"
              borderRadius="lg"
            >
              <Text
                as="span"
                p={2}
                fontWeight="bold"
                display="flex"
                alignItems="center"
                title="Popularidade"
              >
                <AiOutlineHeart />
                &ensp; {movieDetailsInfo?.popularity}
              </Text>
              <Text
                as="span"
                p={2}
                alignSelf="flex-start"
                display="flex"
                alignItems="center"
                fontWeight="bold"
                title="Média de votos"
              >
                <BsFillBookmarkFill></BsFillBookmarkFill>&ensp;
                {movieDetailsInfo?.vote_average}
              </Text>
            </Flex>

            <Flex
              marginTop={['1', '2', '4', '8', '16']}
              background="base.black600"
            >
              <Text as="span" fontWeight="bold" p="5">
                Sinopse:
              </Text>
              <Text as="span" fontWeight="normal" p="5" maxW="800px">
                {movieDetailsInfo?.overview
                  ? movieDetailsInfo.overview
                  : `Desculpe, a sinopse do filme ${movieDetailsInfo?.title} não foi encontrada`}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Center marginBottom={[2, 5, 10]} p={[6, 3, 0]}>
          <Link href="/">
            <ButtonApp
              background="background.yellow"
              color="base.gray500"
              colorHover="#ffce1f"
            >
              <Flex justifyContent="space-between" w="100%" alignItems="center">
                <AiOutlineArrowLeft />
                <Text as="span">Voltar</Text>
              </Flex>
            </ButtonApp>
          </Link>
        </Center>
      </Box>
    </>
  )
}
