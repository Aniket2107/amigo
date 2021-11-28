import {
  USER_LIKED_REQ,
  USER_LIKED_ERR,
  USER_LIKED_TWEET_SUCC,
  LIKE_LIKED_TWEET,
  DISLIKE_LIKED_TWEET,
  ADD_COMMENT_LIKED_TWEET,
  ADD_COMMENT_LIKED_TWEET_REQ,
} from "../types";

import axios from "axios";
import { API } from "../../helpers/API";
import { toast } from "react-toastify";

export const getUserLikedData = () => async (dispatch, getState) => {
  dispatch({
    type: USER_LIKED_REQ,
  });

  try {
    const response = await axios.get(`${API}/tweet/userLiked`, {
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    dispatch({
      type: USER_LIKED_TWEET_SUCC,
      payload: response.data,
    });
  } catch (error) {
    const err = error.response ? error.response.data : error.message;

    dispatch({
      type: USER_LIKED_ERR,
      payload: err,
    });
  }
};

export const likeLikedTweet = (data) => async (dispatch, getState) => {
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
    if (data.like) {
      dispatch({
        type: LIKE_LIKED_TWEET,
        payload: data,
      });
    } else {
      dispatch({
        type: DISLIKE_LIKED_TWEET,
        payload: data,
      });
    }
  } catch (error) {
    const err = error.response ? error.response.data : error.message;

    toast.error(err);
  }
};

export const commentLikedTweet = (data) => async (dispatch, getState) => {
  dispatch({
    type: ADD_COMMENT_LIKED_TWEET_REQ,
    payload: data.tweetId,
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
      type: ADD_COMMENT_LIKED_TWEET,
      payload: {
        tweetId: data.tweetId,
        comments: response.data,
      },
    });

    toast.success("Comment added");
  } catch (error) {
    const err = error.response ? error.response.data : error.message;

    toast.error(err);
  }
};
