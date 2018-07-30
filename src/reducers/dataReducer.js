import {
  FETCHING_DATA,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILURE,
  FILTER_MOVIES_BY_GENRES,
  FILTER_MOVIES_BY_POPULARITY
} from "../constants";

const initialState = {
  dataFetched: false,
  isFetching: false,
  error: false,
  genreId: null,
  genreIds: [],
  movies: [],
  genres: [],
  vouteValue: null
};

const mapMoviesWithGenreIdsAndNames = (movies, genres) => {
  const _sortedMovies = [...movies].sort((a, b) => b.popularity - a.popularity);

  return _sortedMovies;
};

const filterMoviesByGenresHelper = (state, action) => {
  switch (action.type) {
    case FILTER_MOVIES_BY_GENRES:
      return {
        ...state,
        genreIds: state.genreIds.includes(action.genreId)
          ? state.genreIds.filter(item => action.genreId !== item)
          : state.genreIds.concat(action.genreId),

        genreId: action.genreId
      };

    default:
      return state;
  }
};

const filterMoviesByPopularity = (state, action) => {
  switch (action.type) {
    case FILTER_MOVIES_BY_POPULARITY:
      return {
        ...state,
        vouteValue: action.vouteValue
      };

    default:
      return state;
  }
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,

        isFetching: true
      };

    case FETCHING_DATA_SUCCESS:
      const { movies, genres } = action;
      return {
        ...state,
        isFetching: false,
        dataFetched: true,
        movies: mapMoviesWithGenreIdsAndNames(movies, genres),
        genres: genres
      };

    case FETCHING_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      };

    case FILTER_MOVIES_BY_GENRES:
      return filterMoviesByGenresHelper(state, action);

    case FILTER_MOVIES_BY_POPULARITY:
      return filterMoviesByPopularity(state, action);

    default:
      return state;
  }
};

export default dataReducer;
