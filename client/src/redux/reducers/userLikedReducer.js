import {
  USER_LIKED_REQ,
  USER_LIKED_ERR,
  USER_LIKED_TWEET_SUCC,
  LIKE_LIKED_TWEET,
  DISLIKE_LIKED_TWEET,
  ADD_COMMENT_LIKED_TWEET,
  ADD_COMMENT_LIKED_TWEET_REQ,
} from "../types";

const initialState = {
  userLiked: [],
  error: null,
  loading: false,
  commentLoad: null,
};

export const userLikedReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LIKED_TWEET_SUCC:
      return {
        ...state,
        loading: false,
        userLiked: action.payload,
      };

    case USER_LIKED_REQ:
      return {
        ...state,
        loading: true,
      };
    case USER_LIKED_ERR:
      return {
        ...state,
        error: action.payload,
      };

    case LIKE_LIKED_TWEET:
      return {
        ...state,
        userLiked: state.userLiked.map((tw) => {
          if (tw._id === action.payload.tweetId) {
            tw.likes.push(action.payload.userId);
          }
          return tw;
        }),
      };

    case DISLIKE_LIKED_TWEET:
      return {
        ...state,
        userLiked: state.userLiked.map((tw) => {
          if (tw._id === action.payload.tweetId) {
            tw.likes = tw.likes.filter((el) => el !== action.payload.userId);
          }
          return tw;
        }),
      };

    case ADD_COMMENT_LIKED_TWEET:
      return {
        ...state,
        commentLoad: null,
        userLiked: state.userLiked.map((tw) => {
          if (tw._id === action.payload.tweetId) {
            tw.comments = action.payload.comments;
          }
          return tw;
        }),
      };

    case ADD_COMMENT_LIKED_TWEET_REQ: {
      return {
        ...state,
        commentLoad: action.payload,
      };
    }

    default:
      return state;
  }
};
