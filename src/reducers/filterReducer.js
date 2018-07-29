import { FILTER_MOVIES_BY_VOTE } from "../constants";

const initState = {
  genreId: null
};

const filterReducer = (state = initState, action) => {
  return action.type === FILTER_MOVIES_BY_VOTE
    ? {
        ...state,
        genreId: action.genreId
      }
    : state;
};

export default filterReducer;
