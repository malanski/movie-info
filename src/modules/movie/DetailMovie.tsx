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
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
} from 'react-icons/ai'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { CiTimer } from 'react-icons/ci'
import { FaEarthAfrica } from 'react-icons/fa6'
import { FaRegMoneyBillAlt, FaVoteYea } from 'react-icons/fa'
import Link from 'next/link'
import { ButtonApp } from '@/components/Button'
import Head from 'next/head'
import Image from 'next/image'
import { TmdbApi } from '@/services/api'
import { useState } from 'react'

function formatToUSD(number: number): string {
  return number.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

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
          p={['0', '2', '2', '4']}
          minH="90vh"
          wrap="nowrap"
          flexDirection={['column', 'column', 'column', 'row', 'row']}
          justify={['center', 'center', 'space-between']}
          alignItems="center"
        >
          <Flex
            w={['100%', '70%', '80%', '30%']}
            h={['100%']}
            justifyContent="space-between"
            alignItems="center"
            flexDirection={['column-reverse', 'column']}
          >
            <Image
              onClick={handleImageClick}
              title={`Imagens do filme ${movieDetailsInfo?.title}`}
              alt={`Imagens do filme ${movieDetailsInfo?.title}`}
              src={imageUrls[currentImageIndex]}
              priority
              style={{
                perspective: '1000px',
                margin: '2px',
                transition: 'transform 0.6s ease',
                transform: currentImageIndex === 1 ? 'rotateY(360deg)' : 'none',
              }}
              width={400}
              height={400}
            ></Image>

            <Center margin={['2', '4', '8']} p={[6, 3, 0]}>
              <Link href="/">
                <ButtonApp
                  background="background.red"
                  color="base.gray100"
                  colorHover="#ffce1f"
                  title="Retornar à pesquisa anterior"
                >
                  <AiOutlineArrowLeft />
                  <Text as="span">Voltar</Text>
                </ButtonApp>
              </Link>
            </Center>
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
              fontSize={['lg', '20', '22', '25px', '35px']}
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
              <Flex alignItems="center">
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
              </Flex>

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
                  &ensp;
                  {movieDetailsInfo?.status}
                </Text>
              </Text>
            </Flex>

            <Flex
              wrap="wrap"
              justifyContent="space-between"
              alignItems="center"
              w="100%"
              p={2}
              border="2px solid white"
              borderRadius="lg"
              marginBottom={['1', '2', '4', '8', '8']}
              flexDirection={['column-reverse', 'column-reverse', 'row', 'row']}
            >
              <Text
                as="span"
                p={1}
                alignSelf={['start', 'center', 'end']}
                fontWeight="bold"
              >
                Conteúdo adulto: {movieDetailsInfo?.adult ? 'Sim' : 'Não'}
              </Text>

              <Flex
                gap={2}
                wrap={['wrap', 'nowrap', 'wrap']}
                alignSelf={['end', 'center', 'end']}
                justifyContent={['end', 'center', 'end']}
                width="70%"
              >
                {movieDetailsInfo?.genres.map((genre, index) => {
                  if (index < 5) {
                    return (
                      <Text
                        as="span"
                        p={1}
                        borderRadius="lg"
                        fontSize={16}
                        bg={`genres.${genre.id}`}
                        key={genre.id}
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
              marginTop={['4px']}
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
                flexDirection={['column', 'row']}
                title="Popularidade"
              >
                <AiOutlineHeart />
                &ensp; {movieDetailsInfo?.popularity}
              </Text>

              <Text
                as="span"
                p={2}
                fontWeight="bold"
                display="flex"
                alignItems="center"
                flexDirection={['column', 'row']}
                title="Contagem de votos"
              >
                <FaVoteYea></FaVoteYea>
                {movieDetailsInfo?.vote_count}
              </Text>

              <Text
                as="span"
                p={2}
                fontWeight="bold"
                display="flex"
                alignItems="center"
                flexDirection={['column', 'row']}
                title="Média de votos"
              >
                <BsFillBookmarkFill></BsFillBookmarkFill>
                {movieDetailsInfo?.vote_average}
              </Text>
            </Flex>

            <Flex>
              <Text textAlign="center" w={'100%'}>
                {movieDetailsInfo?.tagline}
              </Text>
            </Flex>

            <Flex
              marginTop={['1', '2', '4', '8']}
              background="base.black600"
              flexDirection={['column', 'row']}
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

            <Flex
              as="span"
              w="100%"
              p={1}
              alignSelf="flex-start"
              justifyContent="space-between"
              fontWeight="bold"
              border="2px solid white"
              borderRadius="lg"
              marginTop={['2', '4', '8', '8']}
            >
              <Text
                as="span"
                p={2}
                alignSelf="flex-start"
                display="flex"
                alignItems="center"
                fontWeight="bold"
                title="Tempo do filme em minutos"
              >
                <CiTimer></CiTimer>&ensp;
                {movieDetailsInfo?.runtime}&ensp;min
              </Text>

              <Text
                as="span"
                p={2}
                fontWeight="bold"
                display="flex"
                alignItems="center"
                title="Lingua original"
              >
                &ensp; Idioma principal:&ensp;
                {movieDetailsInfo?.original_language}
              </Text>
            </Flex>

            <Flex
              gap={2}
              wrap={['wrap', 'nowrap', 'wrap']}
              alignSelf={['center', 'center', 'flex-start']}
              alignItems="center"
              justifyContent={['center', 'space-between', 'space-between']}
              width="100%"
              margin="5px"
            >
              <Text>Idiomas usados:</Text>
              {movieDetailsInfo?.spoken_languages.map((lang, index) => {
                if (index < 7) {
                  return (
                    <Text as="span" key={index} p={1} fontSize={16}>
                      {lang.name}
                    </Text>
                  )
                }
                return null
              })}
            </Flex>

            <Box border="2px solid white" p={2} borderRadius="lg">
              <Text alignSelf="start">Produtoras:</Text>
              <Flex
                wrap={['wrap', 'nowrap', 'wrap']}
                alignSelf={['center', 'center', 'flex-start']}
                alignItems="flex-end"
                justifyContent={['center', 'space-between', 'space-between']}
                width="100%"
                flexDirection="row"
                margin="5px"
                background="base.black600"
              >
                {movieDetailsInfo?.production_companies.map((brands, index) => {
                  if (index < 7) {
                    return (
                      <Text
                        key={index}
                        as="span"
                        p={1}
                        fontSize={16}
                        width="40%"
                      >
                        {brands.name}
                      </Text>
                    )
                  }
                  return null
                })}
              </Flex>
            </Box>

            <Flex
              gap={2}
              wrap={['wrap', 'nowrap', 'wrap']}
              alignSelf="flex-start"
              alignItems="center"
              justifyContent={['center', 'space-between', 'space-between']}
              width="100%"
              margin="5px"
            >
              <Text display="flex" alignItems="center">
                <FaEarthAfrica />
                &ensp; Região:
              </Text>
              {movieDetailsInfo?.production_countries.map(
                (countries, index) => {
                  if (index < 7) {
                    return (
                      <Text
                        as="span"
                        key={index}
                        p={1}
                        borderRadius="lg"
                        fontSize={16}
                      >
                        {countries.name}
                      </Text>
                    )
                  }
                  return null
                },
              )}
            </Flex>

            <Flex justifyContent="space-between">
              <Text
                p={2}
                alignSelf="flex-start"
                display="flex"
                alignItems="center"
                flexDirection={['column', 'row']}
                fontWeight="bold"
                color="green"
                title={`Rendimento de '${movieDetailsInfo?.title}' em dólares americanos`}
              >
                <FaRegMoneyBillAlt></FaRegMoneyBillAlt>&ensp;
                {movieDetailsInfo?.revenue
                  ? formatToUSD(movieDetailsInfo.revenue) // Formata a receita em USD
                  : 'Desconhecido.'}
                <AiOutlineArrowUp></AiOutlineArrowUp>
              </Text>

              <Text
                p={2}
                alignSelf="flex-start"
                display="flex"
                alignItems="center"
                flexDirection={['column', 'row']}
                fontWeight="bold"
                color="orange"
                title={`Orçamento de '${movieDetailsInfo?.title}' em dólares americanos`}
              >
                <FaRegMoneyBillAlt></FaRegMoneyBillAlt>&ensp;
                {movieDetailsInfo?.budget
                  ? formatToUSD(movieDetailsInfo.budget) // Formata o orçamento em USD
                  : 'Desconhecido.'}
                <AiOutlineArrowDown></AiOutlineArrowDown>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
