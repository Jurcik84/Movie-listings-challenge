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

const helper_filterMoviesByGenreIdFromForm = (
  arr_all_moviesWithGenresIDsAndNames,
  arr_genresIdsFromForm
) => {
  const data = arr_all_moviesWithGenresIDsAndNames.filter(({ genre_ids }) => {
    // console.log("genre_ids", genre_ids);
    return (
      genre_ids.filter(num_genreIdFromMovies => {
        // console.log("num_genreIdFromForm", num_genreIdFromForm);
        return (
          arr_genresIdsFromForm.filter(num_genreIDsFromForm => {
            // console.log(
            //   "num_genreIdFromMovies === num_genreIDsFromForm",
            //   num_genreIdFromMovies,
            //   num_genreIDsFromForm
            // );
            return num_genreIdFromMovies === num_genreIDsFromForm;
          }).length > 0
        );
      }).length > 0
    );
  });

  return data;
};

const helper_filterByGenres = (
  { movies, genres, genreId, genreIds },
  callback
) => {
  // console.log("genres", genres);
  if (genreIds.length > 0) {
    const data = helper_filterMoviesByGenreIdFromForm(movies, genreIds);
    const arr_allGenresWithNameAndId = helper_listOfActualGenresExtractedFromMovies(
      movies,
      genres
    );
    return data.map((item, index) => {
      return {
        ...item,
        genre_ids: arr_allGenresWithNameAndId.filter(({ name, id }) => {
          return (
            item.genre_ids.filter(genreId => {
              return genreId === id;
            }).length > 0
          );
        })
      };
    });
  }

  return callback(movies, genres);
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
  const { movies, genres, genreId, genreIds, vouteValue } = state.appData;

  return {
    movies: helper_filterByGenres(
      { movies, genres, genreId, genreIds, vouteValue },
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
