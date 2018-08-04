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

// THe data source for genres provide all genres
// even thouse that not exist in actual movie data model / array
// here I use reduce becasue it allows filtering and mapping
const selectorGetAllGenresThatExistInMovies = (
  list_movies = [],
  list_genres = []
) => {
  // REMOVE GENRES FROM LOADED GENRES THAT ARE NOT IN MOVIE ARRAY
  const _arr_onlyGenresInMovies = list_genres.reduce(
    (list_accum, genreItem) => {
      list_movies.forEach(({ genre_ids }) => {
        genre_ids.forEach(id => {
          if (Number(id) === Number(genreItem.id)) {
            list_accum.push(genreItem);
          }
        });
      });

      // REMOVING DUPLICITY FROM ARRAY
      return list_accum.filter((ob_genre, index, list_self) => {
        const c = list_self.map(item => item.id);
        return index === c.indexOf(ob_genre.id);
      });
    },
    []
  );

  return _arr_onlyGenresInMovies;
};

const mapMoviesWithGenreIdsAndNames = (list_movies = [], list_genres = []) => {
  console.log(list_movies);
  // SORTED BY POPULARITY
  const _sortedMovies = [...list_movies].sort(
    (a, b) => Number(b.vote_average) - Number(a.vote_average)
  );

  const _arr_onlyGenresInMovies = selectorGetAllGenresThatExistInMovies(
    (list_movies = []),
    (list_genres = [])
  );
  // // REMOVE GENRES FROM LOADED GENRES THAT ARE NOT IN MOVIE ARRAY

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

  return _arr_allMoviesWitGenresIdAndNames;
};

const filterMoviesByGenresHelper = (state = {}, action = {}) => {
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

const filterMoviesByPopularity = (state = {}, action = {}) => {
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

const dataReducer = (state = initialState, action = {}) => {
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

        //
        movies: mapMoviesWithGenreIdsAndNames(movies, genres),
        //
        genres: selectorGetAllGenresThatExistInMovies(movies, genres)
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
