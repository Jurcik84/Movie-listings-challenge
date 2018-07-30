import React from "react";
import { fetchData, filterMovieByGenre, filterMoviesByVote } from "../actions";
import { connect } from "react-redux";
import { CheckboxLabel, H3, CheckboxView } from "../styled-components";

const RenderFilterComponent = props => {
  const { genres, filterMovieByGenre, filterMoviesByVote, vouteValue } = props;

  return (
    <React.Fragment>
      <div>
        <input
          onChange={e => filterMoviesByVote(Number(e.target.value))}
          type="range"
          step="0.5"
          min="0"
          max="10"
          defaultValue={3}
        />
        <div>{vouteValue === null ? 3 : vouteValue}</div>
      </div>
      {genres.map(({ name, id }, index) => {
        return (
          <CheckboxLabel key={index.toString()}>
            <H3> {name}</H3>
            <CheckboxView
              defaultChecked={false}
              name={name}
              id={id}
              type="checkbox"
              onChange={e => filterMovieByGenre(Number(e.target.id))}
            />
          </CheckboxLabel>
        );
      })}
    </React.Fragment>
  );
};

const helper2 = ({ genre_ids }, arr_genres) => {
  return genre_ids.map(genreId => {
    return arr_genres.filter(gItem => genreId === gItem.id)[0];
  });
};

const helper_mapGenresArray = (arr_movies, arr_genres) => {
  switch (true) {
    case arr_movies && arr_movies.length > 0:
      const ARR_MOVIES = arr_movies.map(movieItem => ({
        ...movieItem,
        genre_ids: helper2(movieItem, arr_genres)
      }));
      return ARR_MOVIES;
    default:
      return [];
  }
};

const helper_listOfActualGenresExtractedFromMovies = (
  arr_all_loaded_movies,
  arr_all_loaded_genres
) => {
  const arr_moviesWithGenresIDSandNames = helper_mapGenresArray(
    arr_all_loaded_movies,
    arr_all_loaded_genres
  );
  const arr_allGenresObjectExtractedFromMovies = arr_moviesWithGenresIDSandNames.reduce(
    (accum, { genre_ids }) => accum.concat(genre_ids),
    []
  );
  // MAP object into aray od ids
  const arr_allGenresIDsFromMovies = arr_allGenresObjectExtractedFromMovies.map(
    ({ id }) => id
  );
  // REMOE DUPLICITY
  const arr_AllGenresIDsNoDuplicity = [...new Set(arr_allGenresIDsFromMovies)];
  const arr_allGenresWithNameAndIDs = arr_AllGenresIDsNoDuplicity.map(
    num_genreId =>
      arr_allGenresObjectExtractedFromMovies.filter(
        ({ id }) => num_genreId === id
      )[0]
  );

  return arr_allGenresWithNameAndIDs;
};

const mapStateToProps = state => {
  const { movies, genres, vouteValue } = state.appData;

  //  genres, filterMovieByGenre, filterMoviesByVote, vouteValue

  return {
    vouteValue,
    genres: helper_listOfActualGenresExtractedFromMovies(movies, genres)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    filterMovieByGenre: value => dispatch(filterMovieByGenre(value)),
    filterMoviesByVote: value => dispatch(filterMoviesByVote(value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RenderFilterComponent);
