import {
  ADD_POST_ERROR,
  ADD_POST_REQ,
  ADD_POST_SUCCESS,
  FEED_ERROR,
  FEED_REQUEST,
  FEED_SUCCESS,
  ADD_LIKE,
  DISLIKE,
  LIKE_REQ,
  LIKE_ERROR,
  ADD_COMMENT,
  ADD_COMMENT_REQ,
  ADD_COMMENT_ERROR,
} from "../types";

const initialState = {
  tweets: [],
  loading: false,
  error: null,
  addTweetLoad: false,
  addTweetErr: null,
  likeLoad: null,
  likeErr: null,
  commentLoad: null,
  commentErr: null,
  commentSuccess: null,
};

export const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FEED_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FEED_SUCCESS:
      return {
        ...state,
        loading: false,
        tweets: action.payload,
      };
    case FEED_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        addTweetLoad: false,
        tweets: [action.payload, ...state.tweets],
      };

    case ADD_POST_REQ:
      return {
        ...state,
        addTweetLoad: true,
      };

    case ADD_POST_ERROR:
      return {
        ...state,
        addTweetLoad: false,
        addTweetErr: action.payload,
      };
    case ADD_LIKE:
      return {
        ...state,
        likeLoad: null,
        tweets: state.tweets.map((tw) => {
          if (tw._id === action.payload.tweetId) {
            tw.likes.push(action.payload.userId);
          }
          return tw;
        }),
      };

    case DISLIKE:
      return {
        ...state,
        likeLoad: null,
        tweets: state.tweets.map((tw) => {
          if (tw._id === action.payload.tweetId) {
            tw.likes = tw.likes.filter((el) => el !== action.payload.userId);
          }
          return tw;
        }),
      };

    case LIKE_REQ:
      return {
        ...state,
        likeLoad: action.payload,
      };

    case LIKE_ERROR:
      return {
        ...state,
        likeLoad: false,
        likeErr: action.payload,
      };

    case ADD_COMMENT:
      return {
        ...state,
        commentLoad: null,
        commentSuccess: action.payload.tweetId,
        tweets: state.tweets.map((tw) => {
          if (tw._id === action.payload.tweetId) {
            tw.comments = action.payload.comments;
          }
          return tw;
        }),
      };

    case ADD_COMMENT_REQ: {
      return {
        ...state,
        commentSuccess: null,
        commentLoad: action.payload,
      };
    }

    case ADD_COMMENT_ERROR: {
      return {
        ...state,
        commentSuccess: null,
        commentLoad: null,
        commentErr: action.payload,
      };
    }

    default:
      return state;
  }
};
