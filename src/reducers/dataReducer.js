import {
  FETCHING_DATA,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILURE,
  FILTER_MOVIES_BY_GENRES
} from "../constants";

const initialState = {
  data: {},
  dataFetched: false,
  isFetching: false,
  error: false,
  genreId: null,
  movies: [],
  genres: []
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        data: {},
        isFetching: true
      };

    case FETCHING_DATA_SUCCESS:
      console.log("FETCHING_DATA_SUCCESS", action);
      const { movies, genres } = action;
      return {
        ...state,
        isFetching: false,
        movies: movies,
        genres: genres
      };

    case FETCHING_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      };

    case FILTER_MOVIES_BY_GENRES:
      console.log("FILTER_MOVIES_BY_GENRES", action);
      return {
        ...state,
        genreId: action.genreId
      };

    default:
      return state;
  }
};

export default dataReducer;
