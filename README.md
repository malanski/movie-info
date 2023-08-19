# Movie Info App using Next.js and Chakra UI

This is a TypeScript-based front-end project built using Next.js and Chakra UI that allows users to search for movie titles and view movie details. The application is populated with data from The Movie Database (TMDB) API.

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/your-username/movie-info.git
   cd movie-catalog
   ```

2. Create a `.env` file in the root of your project and add your TMDB API key:
   ```
   NEXT_PUBLIC_API_KEY=your-tmdb-api-key
   ```

   You can obtain your TMDB API key by registering at [https://developer.themoviedb.org/](https://developer.themoviedb.org/).

3. Install the project dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the app in action.

## API Services

The project uses Axios to interact with the TMDB API. The core API functionality is located in the `services/api.ts` file.

### TmdbApi

A set of functions to interact with the TMDB API:

- `getPopularMovies(page: number)`: Fetches popular movies for the given page.
- `getListGenres()`: Retrieves the list of movie genres.
- `filterMovie(query: string)`: Searches for movies based on the provided query.
- `getMovie(id: number)`: Retrieves detailed information about a specific movie.

## Context and State Management

The project uses React's Context API for state management. The context is defined in the `contexts/MoviesContext.tsx` file.

### MoviesContext

A context that provides the following values to its consumers:

- `infoMovies`: An array of movie information.
- `searchMovie`: The current search query.
- `page`: The current page number.
- `nextPage()`: Function to navigate to the next page of results.
- `beforePage()`: Function to navigate to the previous page of results.
- `getSearchMovie(search: string)`: Function to update the search query.
- `mapGenreIdsToNames(genreIds: number[])`: Function to map genre IDs to genre names.

## Dependencies

- `@chakra-ui/react`: Chakra UI components for building the user interface.
- `axios`: HTTP client for making API requests.
- `date-fns`: Library for handling dates and times.
- `framer-motion`: Animation library for React components.
- `next`: Framework for server-rendered React applications.
- `react`: JavaScript library for building user interfaces.
- `react-dom`: React's DOM rendering package.
- `react-icons`: Library for using SVG icons in React components.
- `typescript`: TypeScript compiler for static type checking.
- `eslint-config-next`: ESLint configuration for Next.js projects.
- `@rocketseat/eslint-config`: ESLint configuration based on Rocketseat's standards.

## Scripts

- `dev`: Starts the development server.
- `build`: Builds the production-ready application.
- `start`: Starts the production server.
- `lint`: Lints the project code.

## Contributing

Feel free to contribute to this project by opening issues or pull requests. Your feedback and contributions are greatly appreciated!

## License

This project is licensed under the [MIT License](LICENSE).

---

This README provides an overview of the Movie Catalog App project. For detailed code and implementation details, please refer to the project files.