import React, { Component } from "react";
import { connect } from "react-redux";

// ACTION CREATORS
import { fetchData, filterMovieByGenre } from "./actions";

class App extends Component {
  state = {};
  componentDidMount() {
    this.props.fetchData();
  }

  renderFilterComponent = () => {
    const { genres, filterMovieByGenre } = this.props;
    console.log(" this.props", this.props);
    return (
      <form>
        <select
          multiple={false}
          onChange={event => filterMovieByGenre(Number(event.target.value))}
        >
          {genres.map((genreItem, genreIndex) => {
            return (
              <option key={genreIndex.toString()} value={genreItem.id}>
                {genreItem.name}
              </option>
            );
          })}
        </select>
      </form>
    );
  };

  renderMovies = movies => {
    return (
      <section>
        <div>{this.renderFilterComponent()}</div>
        <ul>
          {movies.map((movieItem, movieIndex) => (
            <li key={movieIndex.toString()}>
              <div>
                <img
                  src={
                    "https://image.tmdb.org/t/p/w200/" + movieItem.poster_path
                  }
                  alt=""
                />
              </div>
              <h2>{movieItem.original_title}</h2>
              <p>
                {movieItem.genre_ids.map((gItem, gIndex) => (
                  <div>{gItem.name}</div>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </section>
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

const helper2 = (movieItem, arr_genres) => {
  return movieItem.genre_ids.map(genreId => {
    return arr_genres.filter(gItem => genreId === gItem.id)[0];
  });
};

const helper_sortMoviesByPopularity = arr_movies => {
  return [...arr_movies].sort((a, b) => {
    return b.popularity - a.popularity;
  });
};

const helper_addGenresToMovies = (arr_movies, arr_genres) => {
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

const helper_filterByGenres = ({ movies, genres, genreId }, callback) => {
  if (!genreId) {
    return callback(movies, genres);
  } else {
    const _movies = movies.filter(({ genre_ids }) => {
      const _genre_ids = genre_ids.filter(id => {
        return id === genreId;
      });
      return _genre_ids.length > 0;
    });
    return callback(_movies, genres);
  }
};

const mapStateToProps = state => {
  // console.log("mapStateToProps > state", state);
  const { movies, genres, genreId } = state.appData;

  return {
    movies: helper_filterByGenres(
      {
        movies,
        genres,
        genreId
      },
      helper_addGenresToMovies
    ),
    genres
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
