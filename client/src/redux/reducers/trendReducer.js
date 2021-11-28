import { TRENDIND_REQ, TRENDING_SUCCESS, TRENDING_FAIL } from "../types";

const initialState = {
  trendTweets: [],
  loading: false,
  error: null,
};

export const trendReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRENDIND_REQ:
      return {
        ...state,
        loading: true,
      };
    case TRENDING_SUCCESS:
      return {
        ...state,
        loading: false,
        trendTweets: action.payload,
      };
    case TRENDING_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
