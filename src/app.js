import React, { Component } from "react";
import { connect } from "react-redux";

// ACTION CREATORS
import { fetchData } from "./actions";

class App extends Component {
  state = {};
  componentDidMount() {
    this.props.fetchData();
  }

  renderMovies = movies => {
    return (
      <section>
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
            </li>
          ))}
        </ul>
      </section>
    );
  };

  renderLoader = () => <div>a</div>;

  render() {
    const { movies } = this.props;
    console.log("movies", movies);
    if (movies) {
      return this.renderMovies(movies);
    } else {
      return this.renderLoader();
    }
  }
}

const mapStateToProps = state => {
  const { data } = state.appData;

  console.log("data", data);

  return {
    movies: data.movies ? data.movies.results : [],
    genres: data.genres ? data.genres.genres : []
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
