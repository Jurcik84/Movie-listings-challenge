import React, { Component } from "react";
import { connect } from "react-redux";
// ACTION CREATORS
import { fetchData } from "./actions";
// import styled components
import {
  Row,
  Title,
  ListView,
  ListViewItem,
  TitleWrapper,
  GenresWrapper,
  Genre,
  PosterImage,
  SideBarView,
  FooterView,
  H3,
  StatisticDataPanel,
  MainContentView
} from "./styled-components";

// c
import RenderFilterComponent from "./components/FilterSideBar";

class App extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  renderMovies = movies => {
    if (movies.length === 0) {
      return (
        <MainContentView>
          <StatisticDataPanel>{""}</StatisticDataPanel>
          <Row>
            <SideBarView>
              <RenderFilterComponent />
            </SideBarView>
            <ListView>
              <H3>NO Result</H3>
            </ListView>
          </Row>
        </MainContentView>
      );
    } else {
      return (
        <MainContentView>
          <StatisticDataPanel>{""}</StatisticDataPanel>
          <Row>
            <SideBarView>
              <RenderFilterComponent />
            </SideBarView>
            <ListView>
              {movies.map((movieItem, movieIndex) => (
                <ListViewItem key={movieIndex.toString()}>
                  <PosterImage
                    src={
                      "https://image.tmdb.org/t/p/w300/" + movieItem.poster_path
                    }
                    alt={movieItem.original_title}
                  />
                  <TitleWrapper>{movieItem.vote_average}</TitleWrapper>
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
          </Row>
        </MainContentView>
      );
    }
  };

  renderLoader = () => <div>Loading ...</div>;

  render() {
    const { movies, dataFetched, isFetching, error } = this.props;
    if (dataFetched && movies) {
      return this.renderMovies(movies);
    } else if (error) {
      return <Row>ERROR AQUIRED</Row>;
    } else if (isFetching) {
      return this.renderLoader();
    } else {
      return <Row>ERROR AQUIRED</Row>;
    }
  }
}

const helper_filterByGenres = ({
  movies,
  genres,
  genreId,
  genreIds,
  vouteValue
}) => {
  if (genreIds.length > 0) {
    return movies
      .filter(({ genre_ids }) => {
        return (
          genre_ids.filter(obGenreItem => {
            return (
              genreIds.filter(id => {
                return id === obGenreItem.id;
              }).length > 0
            );
          }).length > 0
        );
      })
      .filter(obMovieItem => {
        return obMovieItem.vote_average >= vouteValue;
      });
  }

  return movies.filter(obMovieItem => {
    return obMovieItem.vote_average >= vouteValue;
  });
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

  return {
    dataFetched,
    isFetching,
    error,
    movies: helper_filterByGenres({
      movies,
      genres,
      genreId,
      genreIds,
      vouteValue
    })
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
