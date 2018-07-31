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
  // SORTED BY POPULARITY
  const _sortedMovies = [...movies].sort((a, b) => b.popularity - a.popularity);

  // REMOVE GENRES FROM LOADED GENRES THAT ARE NOT IN MOVIE ARRAY
  const _arr_onlyGenresInMovies = genres.reduce((accum, next) => {
    movies.forEach(({ genre_ids }) => {
      genre_ids.forEach(id => {
        if (id === next.id) {
          accum.push(next);
        }
      });
    });

    // REMOVING DUPLICITY FROM ARRAY
    return accum.filter((ob_genre, index, arr) => {
      const c = arr.map(item => item.id);
      return index === c.indexOf(ob_genre.id);
    });
  }, []);

  // MAP MOVIE ARRAY TO REPLACE IT GENRE IDs WITH OBJECTS CONT. ID AND NAME
  const _arr_allMoviesWitGenresIdAndNames = _sortedMovies.map((item, index) => {
    return {
      ...item,
      genre_ids: _arr_onlyGenresInMovies.filter(({ id }) => {
        return (
          item.genre_ids.filter(genreId => {
            return genreId === id;
          }).length > 0
        );
      })
    };
  });

  return {
    genres: _arr_onlyGenresInMovies,
    movies: _arr_allMoviesWitGenresIdAndNames
  };
};

const filterMoviesByGenresHelper = (state, action) => {
  switch (action.type) {
    case FILTER_MOVIES_BY_GENRES:
      return {
        ...state,
        // add genreId into array it doesnt exist or remove id if exist
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
        movies: mapMoviesWithGenreIdsAndNames(movies, genres).movies,
        genres: mapMoviesWithGenreIdsAndNames(movies, genres).genres
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
