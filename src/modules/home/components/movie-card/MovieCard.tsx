import { Flex, Card, Heading, Text } from '@chakra-ui/react'
import { useEffect, useState, useCallback } from 'react'

import { TmdbApi } from '@/services/api'

interface IListGenres {
  id: number
  name: string
}

interface IMovieCardProps {
  title: string
  imgUrl: string
  genreIds: number[]
  voteAverage: number
}

export const MovieCard = ({
  title,
  imgUrl,
  genreIds,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  voteAverage,
}: IMovieCardProps) => {
  const [listGenres, setListGenres] = useState<IListGenres[]>([])
  const [genres, setGenres] = useState<IListGenres[]>([])

  const mapGenreIdsToNames = useCallback(
    (genreIds: number[]): IListGenres[] => {
      const mappedGenres = genreIds.map((id) => {
        const matchedGenre = listGenres.find((genre) => genre.id === id)
        return matchedGenre || null
      })

      return mappedGenres.filter(
        (genre, index) => genre !== null && index < 2,
      ) as IListGenres[]
    },
    [listGenres],
  )

  useEffect(() => {
    const keyApi = `${process.env.NEXT_PUBLIC_API_KEY}`

    TmdbApi.getListGenres(keyApi).then(({ data }) => {
      setListGenres(data.genres)
      const validGenres = mapGenreIdsToNames(genreIds)

      setGenres(validGenres)
    })
  }, [genreIds, mapGenreIdsToNames])

  return (
    <Card
      bgImage={`url(https://image.tmdb.org/t/p/w500${imgUrl})`}
      bgSize="cover"
      bgPosition="center"
      textAlign="center"
      borderRadius="lg"
      w="220px"
      h="300px"
      justify="end"
      color="base.gray100"
      cursor="pointer"
      transition="all ease-in-out 600ms"
      p={5}
      sx={{ justifySelf: 'center', alignSelf: 'center' }}
      _hover={{
        filter: 'sepia(100%)',
        '& > div > h3': {
          opacity: 1,
          background: 'white',
          transition: 'all ease-in-out 600ms',
        },
        '& > div > div > span': {
          opacity: 0.1,
          transition: 'all ease-in-out 600ms',
        },
      }}
    >
      <Flex direction="column" gap={2}>
        <Flex gap={3}>
          {genres.map((genre) => (
            <Text
              fontWeight="bold"
              key={genre.id}
              as="span"
              opacity="0.7"
              bg="blue"
              p={1}
              borderRadius={5}
              fontSize={13}
              width="100%"
              transition="all ease-in-out 600ms"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {genre.name}
            </Text>
          ))}
        </Flex>
        {/* <Text fontWeight="bold" color="#DAA520">
          Nota: {voteAverage}
        </Text> */}
        <Heading
          as="h3"
          p={1}
          fontSize={17}
          borderRadius={5}
          fontWeight="bold"
          textTransform="uppercase"
          opacity="0.5"
          transition="all ease-in-out 600ms"
          style={{
            textShadow: '0px 0px 50px #1281c3',
            color: '#161616',
          }}
        >
          {title}
        </Heading>
      </Flex>
    </Card>
  )
}
