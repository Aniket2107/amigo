import {
  MY_TWEETS_SUC,
  MY_TWEETS_REQ,
  MY_TWEETS_FAIL,
  EDIT_TWEET_SUCCCESS,
  EDIT_TWEET_FAIL,
  DELETE_TWEET_FAIL,
  DELETE_TWEET_SUCCESS,
} from "../types";

import { API } from "../../helpers/API";

import { toast } from "react-toastify";
import axios from "axios";

export const getMyTweets = () => async (dispatch, getState) => {
  dispatch({
    type: MY_TWEETS_REQ,
  });

  try {
    const response = await axios.get(`${API}/tweet/userTweets`, {
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    dispatch({
      type: MY_TWEETS_SUC,
      payload: response.data,
    });
  } catch (error) {
    const err = error.response ? error.response.data : error.message;

    dispatch({
      type: MY_TWEETS_FAIL,
      payload: err,
    });
  }
};

export const editTweet = (data) => async (dispatch, getState) => {
  try {
    await axios.put(
      `${API}/tweet/${data.tweetId}`,
      {
        content: data.content,
      },
      {
        headers: {
          Authorization: `Bearer ${getState().auth.accessToken}`,
        },
      }
    );

    dispatch({
      type: EDIT_TWEET_SUCCCESS,
      payload: data,
    });

    toast.success("Tweet Updated");
  } catch (error) {
    const err = error.response ? error.response.data : error.message;

    dispatch({
      type: EDIT_TWEET_FAIL,
      payload: err,
    });

    toast.error(err);
  }
};

export const deleteTweet = (tweetId) => async (dispatch, getState) => {
  try {
    await axios.delete(`${API}/tweet/${tweetId}`, {
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    dispatch({
      type: DELETE_TWEET_SUCCESS,
      payload: tweetId,
    });

    toast.success("Tweet deleted");
  } catch (error) {
    const err = error.response ? error.response.data : error.message;

    dispatch({
      type: DELETE_TWEET_FAIL,
      payload: err,
    });

    toast.error(err);
  }
};
