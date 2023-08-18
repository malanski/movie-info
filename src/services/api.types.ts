interface IBelongsToCollection {
  id: number
  name: string
  poster_path: string
  backdrop_path: string
}

export interface IGenre {
  id: number
  name: string
}

interface IProductionCompany {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

interface IProductionCountry {
  iso_3166_1: string
  name: string
}

interface ISpokenLanguage {
  iso_639_1: string
  name: string
}

export interface IMovieDetailsInfo {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: IBelongsToCollection
  budget: number
  genres: IGenre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: IProductionCompany[]
  production_countries: IProductionCountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: ISpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface IInfoMovies {
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
  vote_average: number
}
