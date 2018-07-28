import {
  FETCHING_DATA,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILURE,

  // FILTER
  FILTER_MOVIES_BY_GENRES
} from "./constants";

export const getData = () => ({
  type: FETCHING_DATA
});

export const getDataSuccess = (genres, movies) => ({
  type: FETCHING_DATA_SUCCESS,
  genres: genres.genres,
  movies: movies.results
});

export const getDataFailure = () => ({
  type: FETCHING_DATA_FAILURE
});

export const filterMovieByGenre = genreId => ({
  type: FILTER_MOVIES_BY_GENRES,
  genreId
});

// AJAX API > SHOUL BE STORED IN DEFF FOLDER BUT FOR NO IT"S OK HAVE IT HERE
const fetchMovieInParallel = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?api_key=67ff8239b8155c67a9a48930ed9f4e13&language=en-US&page=1"
  );
  return await response.json();
};

const fetchGenresInParallel = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=67ff8239b8155c67a9a48930ed9f4e13&language=en-US"
  );
  return await response.json();
};

export const fetchData = () => {
  return async dispatch => {
    dispatch(getData());
    try {
      const [genres, movies] = await Promise.all([
        fetchGenresInParallel(),
        fetchMovieInParallel()
      ]);
      dispatch(getDataSuccess(genres, movies));
    } catch (error) {
      dispatch(getDataFailure());
    }
  };
};

// const response = await fetch(
//   "https://api.themoviedb.org/3/movie/now_playing?api_key=67ff8239b8155c67a9a48930ed9f4e13&language=en-US&page=1"
// );
// const dataToJSON = await response.json();
// dispatch(getDataSuccess(dataToJSON));

// fetch(
//   "https://api.themoviedb.org/3/movie/now_playing?api_key=67ff8239b8155c67a9a48930ed9f4e13&language=en-US&page=1"
// )
// .then(data => data.json())
// .then(data => dispatch(getDataSuccess(data)))
// .catch(error => dispatch(getDataFailure()));
