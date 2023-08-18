import { Flex, Card, Heading, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { MoviesContext } from '@/context/MoviesContext'
import Link from 'next/link'

interface IMovieCardProps {
  title: string
  imgUrl: string
  id: number
  genreIds: number[]
  voteAverage: number
}

export const MovieCard = ({ title, imgUrl, genreIds, id }: IMovieCardProps) => {
  const { mapGenreIdsToNames } = useContext(MoviesContext)
  return (
    <Link href={`/movie/${id}`}>
      <Card
        bgImage={`url(https://image.tmdb.org/t/p/w500${imgUrl})`}
        title={`${title}`}
        bgSize="cover"
        bgPosition="center"
        textAlign="center"
        borderRadius="lg"
        w={[280, 240, 220, 240, 270]}
        h={[360, 320, 300, 320, 350]}
        justify="end"
        color="base.gray100"
        cursor="pointer"
        transition="all ease-in-out 600ms"
        p={1}
        sx={{ justifySelf: 'center', alignSelf: 'center' }}
        _hover={{
          filter: 'sepia(100%)',
          '& > div > h3': {
            opacity: 1,
            background: 'white',
            transition: 'all ease-in-out 600ms',
          },
          '& > div > div > span': {
            display: 'none',
            opacity: 0.1,
            transition: 'all ease-in-out 600ms',
          },
        }}
      >
        <Flex direction="column">
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

          <Flex gap={3}>
            {genreIds &&
              mapGenreIdsToNames(genreIds)?.map((genre) => (
                <Text
                  fontWeight="bold"
                  key={genre.id}
                  as="span"
                  bg={`genres.${genre.id}`}
                  p={0.2}
                  borderRadius={5}
                  fontSize={13}
                  width="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  transition="all ease-in-out 600ms"
                >
                  {genre.name}
                </Text>
              ))}
          </Flex>
        </Flex>
      </Card>
    </Link>
  )
}
