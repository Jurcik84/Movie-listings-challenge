import {
  FETCHING_DATA,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILURE
} from "./constants";

export const getData = () => ({
  type: FETCHING_DATA
});

export const getDataSuccess = data => ({
  type: FETCHING_DATA_SUCCESS,
  data
});

export const getDataFailure = () => ({
  type: FETCHING_DATA_FAILURE
});

export const fetchData = () => {
  return dispatch => {
    dispatch(getData());
    fetch("https://jsonplaceholder.typicode.com/posts/")
      .then(data => data.json())
      .then(data => dispatch(getDataSuccess(data)))
      .catch(error => dispatch(getDataFailure()));
  };
};
