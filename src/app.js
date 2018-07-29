import React, { Component } from "react";
import { connect } from "react-redux";
// ACTION CREATORS
import { fetchData, filterMovieByGenre } from "./actions";
// import styled components
import {
  Wrapper,
  Title,
  ListView,
  ListViewItem,
  TitleWrapper,
  GenresWrapper,
  Genre,
  PosterImage,
  HeaderView,
  FooterView,
  FormView
} from "./styled-components";

class App extends Component {
  state = {};
  componentDidMount() {
    this.props.fetchData();
  }

  // renderFilterComponent = () => {
  //   const { genres, filterMovieByGenre } = this.props;
  // };

  renderFilterComponent = () => {
    const { genres, filterMovieByGenre } = this.props;

    return (
      <FormView>
        {genres.map(({ name, id }, index) => {
          return (
            <div key={index.toString()}>
              <label>{name}</label>
              <input
                defaultChecked={false}
                name={name}
                id={id}
                type="checkbox"
                onChange={e => filterMovieByGenre(Number(e.target.id))}
              />
            </div>
          );
        })}
      </FormView>
    );

    // return (
    //   <form>
    //     <select
    //       multiple={false}
    //       onChange={event => filterMovieByGenre(Number(event.target.value))}
    //     >
    //       <option value={null}>Reset</option>
    //       {genres.map((genreItem, genreIndex) => {
    //         return (
    //           <option key={genreIndex.toString()} value={genreItem.id}>
    //             {genreItem.name}
    //           </option>
    //         );
    //       })}
    //     </select>
    //     <hr />
    //   </form>
    // );
  };

  renderMovies = movies => {
    return (
      <Wrapper>
        <HeaderView>{this.renderFilterComponent()}</HeaderView>
        <ListView>
          {movies.map((movieItem, movieIndex) => (
            <ListViewItem key={movieIndex.toString()}>
              <PosterImage
                src={"https://image.tmdb.org/t/p/w300/" + movieItem.poster_path}
                alt={movieItem.original_title}
              />
              <TitleWrapper>
                <Title>{movieItem.original_title}</Title>
              </TitleWrapper>

              <GenresWrapper>
                {movieItem.genre_ids.map((gItem, gIndex) => (
                  <Genre key={gIndex.toString()}>{gItem.name}</Genre>
                ))}
              </GenresWrapper>
            </ListViewItem>
          ))}
        </ListView>
        <FooterView />
      </Wrapper>
    );
  };

  renderLoader = () => <div>a</div>;

  render() {
    const { movies } = this.props;
    if (movies) {
      return this.renderMovies(movies);
    } else {
      return this.renderLoader();
    }
  }
}

const helper2 = ({ genre_ids }, arr_genres) => {
  return genre_ids.map(genreId => {
    return arr_genres.filter(gItem => genreId === gItem.id)[0];
  });
};

const helper_sortMoviesByPopularity = arr_movies => {
  return [...arr_movies].sort((a, b) => b.popularity - a.popularity);
};

const helper_mapGenresArray = (arr_movies, arr_genres) => {
  switch (true) {
    case arr_movies && arr_movies.length > 0:
      const ARR_MOVIES = arr_movies.map(movieItem => ({
        ...movieItem,
        genre_ids: helper2(movieItem, arr_genres)
      }));
      return helper_sortMoviesByPopularity(ARR_MOVIES);
    default:
      return [];
  }
};

const helper_filterByGenres = (
  { movies, genres, genreId, vouteValue },
  callback
) => {
  const arr_genresIdsFromForm = [...genreId];
  const arr_all_moviesWithGenresIDsAndNames = callback(movies, genres);

  const num_lastAdedGenreId = arr_genresIdsFromForm[
    arr_genresIdsFromForm.length - 1
  ]
    ? arr_genresIdsFromForm[arr_genresIdsFromForm.length - 1]
    : null;

  if (arr_genresIdsFromForm.length === 0) {
    return arr_all_moviesWithGenresIDsAndNames;
  } else if (arr_genresIdsFromForm.length > 0) {
    const res = arr_all_moviesWithGenresIDsAndNames.filter(({ genre_ids }) => {
      return (
        genre_ids.filter(({ id }) => {
          return (
            arr_genresIdsFromForm.filter(UI_id => {
              return id === UI_id;
            }).length > 0
          );
        }).length > 0
      );
    });

    return res;
  }

  // switch (true) {
  //   case genreId === undefined || genreId === null:
  //     return callback(movies, genres);

  //   default:
  //   // const _movies = movies.filter(
  //   //   ({ genre_ids }) =>
  //   //     genre_ids.filter(id => Number(id) === Number(genreId)).length > 0
  //   // );

  //   // return callback(_movies, genres);
  // }
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
  const { movies, genres, genreId, vouteValue } = state.appData;
  console.log(genreId);

  return {
    movies: helper_filterByGenres(
      { movies, genres, genreId, vouteValue },
      helper_mapGenresArray
    ),
    genres: helper_listOfActualGenresExtractedFromMovies(movies, genres)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(fetchData()),
    filterMovieByGenre: value => dispatch(filterMovieByGenre(value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
