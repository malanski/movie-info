import { createContext, ReactNode, useState, useEffect } from 'react'

import { TmdbApi } from '@/services/api'

interface IInfoMovies {
  adult: boolean
  backdrop_path: string
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

interface IListGenres {
  id: number
  name: string
}

interface IMoviesContextType {
  infoMovies: IInfoMovies[]
  page: number
  filterInfoMovie: IInfoMovies[] | undefined
  beforePage: () => void
  nextPage: () => void
  getFilterInfoMovie: (search: IInfoMovies[]) => void
  mapGenreIdsToNames: (genreIds: number[]) => IListGenres[]
}

export const MoviesContext = createContext({} as IMoviesContextType)

interface IMoviesContextProviderProps {
  children: ReactNode
}

export const MoviesContextProvider = ({
  children,
}: IMoviesContextProviderProps) => {
  const [infoMovies, setInfoMovies] = useState<IInfoMovies[]>([])
  const [listGenres, setListGenres] = useState<IListGenres[]>([])
  const [filterInfoMovie, setFilterInfoMovie] = useState<
    IInfoMovies[] | undefined
  >(undefined)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const keyApi = `${process.env.NEXT_PUBLIC_API_KEY}`

    TmdbApi.getPopularMovies(page, keyApi)
      .then(({ data }) => {
        setInfoMovies(data.results)
      })
      .catch((error) => {
        console.log(error)
      })

    TmdbApi.getListGenres(keyApi)
      .then(({ data }) => {
        setListGenres(data.genres)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [page])

  const mapGenreIdsToNames = (genreIds: number[]): IListGenres[] => {
    const mappedGenres = genreIds.map((id) => {
      const matchedGenre = listGenres.find((genre) => genre.id === id)
      return matchedGenre || null
    })

    return mappedGenres.filter(
      (genre, index) => genre !== null && index < 2,
    ) as IListGenres[]
  }

  const beforePage = () => {
    setPage((prevState) => prevState - 1)
    window.scrollTo(0, 0)
  }

  const nextPage = () => {
    setPage((prevState) => prevState + 1)
    window.scrollTo(0, 0)
  }
  const getFilterInfoMovie = (search: IInfoMovies[]) => {
    setFilterInfoMovie(search)
  }

  return (
    <MoviesContext.Provider
      value={{
        infoMovies,
        page,
        beforePage,
        nextPage,
        mapGenreIdsToNames,
        getFilterInfoMovie,
        filterInfoMovie,
      }}
    >
      {children}
    </MoviesContext.Provider>
  )
}
