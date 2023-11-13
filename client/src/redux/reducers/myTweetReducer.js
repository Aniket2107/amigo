import {
  MY_TWEETS_SUC,
  MY_TWEETS_REQ,
  MY_TWEETS_FAIL,
  EDIT_TWEET_SUCCCESS,
  EDIT_TWEET_FAIL,
  DELETE_TWEET_FAIL,
  DELETE_TWEET_SUCCESS,
} from "../types";

const initialState = {
  myTweets: [],
  myTweetLoad: false,
  myTweetErr: null,
  editTweetErr: null,
  deleteTweetErr: null,
};

export const myTweetReducer = (state = initialState, action) => {
  switch (action.type) {
    case MY_TWEETS_REQ: {
      return {
        ...state,
        myTweetLoad: true,
      };
    }

    case MY_TWEETS_SUC: {
      return {
        ...state,
        myTweets: action.payload,
        myTweetLoad: false,
      };
    }

    case MY_TWEETS_FAIL:
      return {
        ...state,
        myTweetLoad: false,
        myTweetErr: action.payload,
      };

    case EDIT_TWEET_SUCCCESS:
      return {
        ...state,
        myTweets: state.myTweets.map((tw) => {
          if (tw._id === action.payload.tweetId) {
            console.log("check 1");
            tw.content = action.payload.content;
          }
          return tw;
        }),
      };

    case DELETE_TWEET_SUCCESS:
      return {
        ...state,
        myTweets: state.myTweets.filter((tw) => tw._id !== action.payload),
      };

    case EDIT_TWEET_FAIL:
      return {
        ...state,
        editTweetErr: action.payload,
      };

    case DELETE_TWEET_FAIL:
      return {
        ...state,
        deleteTweetErr: action.payload,
      };

    default:
      return state;
  }
};
