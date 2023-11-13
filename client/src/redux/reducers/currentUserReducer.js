import {
  CURRENTUSER_FAIL,
  CURRENTUSER_REQ,
  CURRENTUSER_SUCCESS,
  UNFOLLOW_CURRENT,
  FOLLOW_CURRENT,
  CURRENT_USER_TWEET_REQ,
  CURRENT_USER_TWEET_FAIL,
  CURRENT_USER_TWEET_SUCCESS,
} from "../types";

const initialState = {
  currentUser: {},
  loading: false,
  error: null,
  currentUserTweets: [],
  ctLoad: false,
  ctError: null,
};

export const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENTUSER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case CURRENTUSER_REQ: {
      return {
        ...state,
        loading: true,
      };
    }
    case CURRENTUSER_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case FOLLOW_CURRENT: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          followers: [...state.currentUser.followers, action.payload],
        },
      };
    }

    case UNFOLLOW_CURRENT: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          followers: state.currentUser.followers.filter(
            (el) => el !== action.payload
          ),
        },
      };
    }

    case CURRENT_USER_TWEET_REQ:
      return {
        ...state,
        ctLoad: true,
      };

    case CURRENT_USER_TWEET_FAIL:
      return {
        ...state,
        ctError: action.payload,
      };

    case CURRENT_USER_TWEET_SUCCESS:
      return {
        ...state,
        ctLoad: false,
        currentUserTweets: action.payload,
      };
    default:
      return state;
  }
};
