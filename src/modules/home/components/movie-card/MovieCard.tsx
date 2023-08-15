import { TmdbApi } from '@/services/api'
import { Flex, Card, Heading, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

interface IListGenres {
  id: number
  name: string
}

interface IMovieCardProps {
  title: string
  imgUrl: string
  genreIds: number[]
}

export const MovieCard = ({ title, imgUrl, genreIds }: IMovieCardProps) => {
  const [listGenres, setListGenres] = useState<IListGenres[]>([])
  const [genres, setGenres] = useState<string[]>([])

  useEffect(() => {
    const keyApi = `${process.env.NEXT_PUBLIC_API_KEY}`

    TmdbApi.getListGenres(keyApi).then(({ data }) => {
      setListGenres(data.genres)
      mapGenreIdsToNames(genreIds)
    })
  }, [genreIds])

  const mapGenreIdsToNames = (genreIds: number[]): void => {
    const mappedGenres = genreIds.map((id) => {
      const matchedGenre = listGenres.find((genre) => genre.id === id)
      return matchedGenre ? matchedGenre.name : ''
    })

    setGenres((prevState) => [...prevState, ...mappedGenres])
  }

  console.log(genres)

  return (
    <Card
      bgImage={`url(https://image.tmdb.org/t/p/w500${imgUrl})`}
      bgSize="cover"
      bgPosition="center"
      borderRadius="lg"
      w="220px"
      h="300px"
      justify="end"
      color="base.gray100"
      cursor="pointer"
      p={5}
      sx={{ justifySelf: 'center', alignSelf: 'center' }}
      _hover={{ filter: 'sepia(100%)' }}
    >
      <Flex direction="column" gap={2}>
        <Heading as="h3" size="md" fontWeight="bold">
          {title}
        </Heading>
        {genres.map((genre) => (
          <Text fontWeight="bold" key={genre}>
            {genre}
          </Text>
        ))}
        <Text fontWeight="bold">1h53min</Text>
      </Flex>
    </Card>
  )
}
