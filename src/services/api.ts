import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: process.env.NEXT_PUBLIC_API_KEY,
    language: 'pt-BR',
  },
})

export const TmdbApi = {
  getPopularMovies: (page: number) => {
    return axios.get(`/discover/movie?sort`, {
      params: {
        sort_by: 'popularity.desc',
        page,
      },
    })
  },
  getListGenres: () => {
    return axios.get(`genre/movie/list`)
  },
  filterMovie: (query: string) => {
    return axios.get(`search/movie`, {
      params: {
        query,
      },
    })
  },
  getMovie: (id: number) => {
    return axios.get(`movie/${id}`, {
      params: {
        external_source: 'imdb_id',
      },
    })
  },
}
