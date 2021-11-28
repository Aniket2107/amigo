import {
  CURRENT_TWEET_SUC,
  CURRENT_TWEET_FAIL,
  CURRENT_TWEET_REQ,
  ADD_COMMENT_CURRENT_TWEET_SUC,
  ADD_COMMENT_CURRENT_TWEET_REQ,
  LIKE_CURRENT_TWEET,
  DISLIKE_CURRENT_TWEET,
} from "../types";

import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../helpers/API";

export const getCurrentTweet = (id) => async (dispatch) => {
  dispatch({
    type: CURRENT_TWEET_REQ,
  });

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`${API}/tweet/${id}`);

      dispatch({
        type: CURRENT_TWEET_SUC,
        payload: response.data,
      });

      resolve(true);
    } catch (error) {
      const err = error.response ? error.response.data : error.message;

      dispatch({
        type: CURRENT_TWEET_FAIL,
        payload: err,
      });

      reject(false);
    }
  });
};

export const currentTweeetToggleLike = (data) => async (dispatch, getState) => {
  try {
    await axios.put(
      `${API}/tweet/${data.tweetId}/like`,
      {},
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${getState().auth.accessToken}`,
        },
      }
    );

    const userId = getState().auth.user._id;

    if (data.like) {
      dispatch({
        type: LIKE_CURRENT_TWEET,
        payload: userId,
      });
    } else {
      dispatch({
        type: DISLIKE_CURRENT_TWEET,
        payload: userId,
      });
    }
  } catch (error) {
    const err = error.response ? error.response.data : error.message;

    toast.error(err);
  }
};

export const currentTweeetaddComment = (data) => async (dispatch, getState) => {
  dispatch({
    type: ADD_COMMENT_CURRENT_TWEET_REQ,
  });

  try {
    const response = await axios.put(
      `${API}/tweet/${data.tweetId}/comment`,
      {
        comment: data.comment,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${getState().auth.accessToken}`,
        },
      }
    );

    dispatch({
      type: ADD_COMMENT_CURRENT_TWEET_SUC,
      payload: response.data,
    });

    toast.success("Comment added");
  } catch (error) {
    const err = error.response ? error.response.data : error.message;

    toast.error(err);
  }
};
