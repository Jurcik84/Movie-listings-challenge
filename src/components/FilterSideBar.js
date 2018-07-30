import React from "react";
import { filterMovieByGenre, filterMoviesByVote } from "../actions";
import { connect } from "react-redux";
import {
  CheckboxLabel,
  H3,
  CheckBoxInput,
  RangeInput,
  Divider
} from "../styled-components";

const RenderFilterComponent = props => {
  const { genres, filterMovieByGenre, filterMoviesByVote, vouteValue } = props;

  return (
    <React.Fragment>
      <RangeInput
        onChange={e => filterMoviesByVote(Number(e.target.value))}
        type="range"
        step="0.5"
        min="0"
        max="10"
        defaultValue={3}
      />
      <div>{vouteValue === null ? 3 : vouteValue}</div>
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
