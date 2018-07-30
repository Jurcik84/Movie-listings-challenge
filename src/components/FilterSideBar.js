import React from "react";
import { filterMovieByGenre, filterMoviesByVote } from "../actions";
import { connect } from "react-redux";
import {
  CheckboxLabel,
  H3,
  CheckBoxInput,
  RangeInput,
  Divider,
  H5,
  SmallFont
} from "../styled-components";

const RenderFilterComponent = props => {
  const { genres, filterMovieByGenre, filterMoviesByVote, vouteValue } = props;

  return (
    <React.Fragment>
      <H5>Filter By Popularity</H5>
      <RangeInput
        onChange={e => filterMoviesByVote(Number(e.target.value))}
        type="range"
        step="0.5"
        min="0"
        max="10"
        defaultValue={3}
      />
      <SmallFont>popularity : {vouteValue === null ? 3 : vouteValue}</SmallFont>

      <H5>Filter By Genres</H5>
      <Divider />
      {genres.map(({ name, id }, index) => {
        return (
          <CheckboxLabel key={index.toString()}>
            <H3> {name}</H3>
            <CheckBoxInput
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

const mapStateToProps = state => {
  const { genres, vouteValue } = state.appData;

  //  genres, filterMovieByGenre, filterMoviesByVote, vouteValue

  return {
    vouteValue,
    genres
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
