import React, { Component } from "react";
import { connect } from "react-redux";
// ACTION CREATORS
import { fetchData } from "./actions";
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
  H3
} from "./styled-components";

// c
import RenderFilterComponent from "./components/FilterSideBar";

class App extends Component {
  state = {
    rangeValue: 3
  };
  componentDidMount() {
    this.props.fetchData();
  }

  renderMovies = movies => {
    if (movies.length === 0) {
      return (
        <Wrapper>
          <HeaderView>
            <RenderFilterComponent />
          </HeaderView>
          <ListView>
            <H3>NO Result</H3>
          </ListView>
        </Wrapper>
      );
    } else {
      return (
        <Wrapper>
          <HeaderView>
            <RenderFilterComponent />
          </HeaderView>
          <ListView>
            {movies.map((movieItem, movieIndex) => (
              <ListViewItem key={movieIndex.toString()}>
                <PosterImage
                  src={
                    "https://image.tmdb.org/t/p/w300/" + movieItem.poster_path
                  }
                  alt={movieItem.original_title}
                />
                <small>{movieItem.vote_average}</small>
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
    }
  };

  renderLoader = () => <div>Loading ...</div>;

  render() {
    const { movies, dataFetched, isFetching, error } = this.props;
    console.log(this.props);

    if (dataFetched && movies) {
      return this.renderMovies(movies);
    } else if (error) {
      return <Wrapper>ERROR AQUIRED</Wrapper>;
    } else if (isFetching) {
      return this.renderLoader();
    } else {
      return <Wrapper>ERROR AQUIRED</Wrapper>;
    }
  }
}

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

const helper_filterMoviesByGenreIdFromForm = (
  arr_all_moviesWithGenresIDsAndNames,
  arr_genresIdsFromForm
) => {
  const data = arr_all_moviesWithGenresIDsAndNames.filter(({ genre_ids }) => {
    return (
      genre_ids.filter(num_genreIdFromMovies => {
        return (
          arr_genresIdsFromForm.filter(num_genreIDsFromForm => {
            return num_genreIdFromMovies === num_genreIDsFromForm;
          }).length > 0
        );
      }).length > 0
    );
  });

  return data;
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

const helper_filterByGenres = (
  { movies, genres, genreId, genreIds, vouteValue },
  callback
) => {
  const data = helper_filterMoviesByGenreIdFromForm(movies, genreIds);
  const arr_allGenresWithNameAndId = helper_listOfActualGenresExtractedFromMovies(
    movies,
    genres
  );

  if (genreIds.length > 0) {
    return data
      .map((item, index) => {
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
      })
      .filter(({ vote_average }) => vote_average >= vouteValue);
  } else {
    return callback(movies, genres).filter(
      ({ vote_average }) => vote_average >= vouteValue
    );
  }
};

const mapStateToProps = state => {
  const {
    movies,
    genres,
    genreId,
    genreIds,
    vouteValue,
    dataFetched,
    isFetching,
    error
  } = state.appData;

  console.log("all movies :", movies);

  return {
    dataFetched,
    isFetching,
    error,
    vouteValue,
    movies: helper_filterByGenres(
      { movies, genres, genreId, genreIds, vouteValue },
      helper_mapGenresArray
    )
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(fetchData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
