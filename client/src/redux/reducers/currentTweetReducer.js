import {
  CURRENTUSER_REQ,
  CURRENT_TWEET_FAIL,
  CURRENT_TWEET_SUC,
  ADD_COMMENT_CURRENT_TWEET_SUC,
  ADD_COMMENT_CURRENT_TWEET_REQ,
  LIKE_CURRENT_TWEET,
  DISLIKE_CURRENT_TWEET,
} from "../types";

const initialState = {
  currentTweet: {},
  loading: false,
  error: null,
  commentLoad: false,
};

export const currentTweetReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_TWEET_SUC:
      return {
        ...state,
        loading: false,
        currentTweet: action.payload,
      };
    case CURRENTUSER_REQ: {
      return {
        ...state,
        loading: true,
      };
    }
    case CURRENT_TWEET_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case ADD_COMMENT_CURRENT_TWEET_SUC: {
      return {
        ...state,
        commentLoad: false,
        currentTweet: {
          ...state.currentTweet,
          comments: action.payload,
        },
      };
    }

    case ADD_COMMENT_CURRENT_TWEET_REQ:
      return {
        ...state,
        commentLoad: true,
      };

    case LIKE_CURRENT_TWEET: {
      return {
        ...state,
        currentTweet: {
          ...state.currentTweet,
          likes: [...state.currentTweet.likes, action.payload],
        },
      };
    }

    case DISLIKE_CURRENT_TWEET: {
      return {
        ...state,
        currentTweet: {
          ...state.currentTweet,
          likes: state.currentTweet.likes.filter((el) => el !== action.payload),
        },
      };
    }

    default:
      return state;
  }
};
