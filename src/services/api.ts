import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
})

export const TmdbApi = {
  getPopularMovies: (page: number, keyApi: string) => {
    return axios.get(
      `/discover/movie?sort_by=popularity.desc&page=${page}&api_key=${keyApi}&language=pt-BR`,
    )
  },
  getListGenres: (keyApi: string) => {
    return axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${keyApi}&language=pt-BR`,
    )
  },
}
