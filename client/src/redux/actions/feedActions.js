import {
  ADD_POST_SUCCESS,
  ADD_POST_ERROR,
  ADD_POST_REQ,
  FEED_ERROR,
  FEED_REQUEST,
  FEED_SUCCESS,
  LIKE_ERROR,
  ADD_LIKE,
  DISLIKE,
  LIKE_REQ,
  ADD_COMMENT_ERROR,
  ADD_COMMENT_REQ,
  ADD_COMMENT,
} from "../types";
import { API } from "../../helpers/API";

import axios from "axios";
import { toast } from "react-toastify";

export const getFeedData = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FEED_REQUEST,
    });

    const response = await axios(`${API}/tweet/timeline`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    dispatch({
      type: FEED_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const err = error.response ? error.response.data : error.message;

    dispatch({
      type: FEED_ERROR,
      payload: err,
    });

    toast.error(err);
  }
};

export const addTweet = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_POST_REQ,
    });

    const response = await axios.post(`${API}/tweet/`, data, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    console.log(response);

    dispatch({
      type: ADD_POST_SUCCESS,
      payload: response.data,
    });

    toast.success("Tweet added");
  } catch (error) {
    const err = error.response ? error.response.data : error.message;

    dispatch({
      type: ADD_POST_ERROR,
      payload: err,
    });

    toast.error(err);
  }
};

export const toggleLike = (data) => async (dispatch, getState) => {
  dispatch({
    type: LIKE_REQ,
    payload: data.tweetId,
  });

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
        type: ADD_LIKE,
        payload: data,
      });
    } else {
      dispatch({
        type: DISLIKE,
        payload: data,
      });
    }
  } catch (error) {
    const err = error.response ? error.response.data : error.message;

    dispatch({
      type: LIKE_ERROR,
      payload: err,
    });

    toast.error(err);
  }
};

export const addComment = (data) => async (dispatch, getState) => {
  dispatch({
    type: ADD_COMMENT_REQ,
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
      type: ADD_COMMENT,
      payload: {
        tweetId: data.tweetId,
        comments: response.data,
      },
    });

    toast.success("Comment added");
  } catch (error) {
    const err = error.response ? error.response.data : error.message;

    dispatch({
      type: ADD_COMMENT_ERROR,
      payload: err,
    });

    toast.error(err);
  }
};
