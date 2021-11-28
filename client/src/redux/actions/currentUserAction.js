import {
  CURRENTUSER_FAIL,
  CURRENTUSER_REQ,
  CURRENTUSER_SUCCESS,
  UNFOLLOW_CURRENT,
  FOLLOW_CURRENT,
  UPDATE_MY_FOLLOWING_Y,
  UPDATE_MY_FOLLOWING_N,
  CURRENT_USER_TWEET_REQ,
  CURRENT_USER_TWEET_FAIL,
  CURRENT_USER_TWEET_SUCCESS,
} from "../types";

import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../helpers/API";

export const getCurrentUser = (id) => async (dispatch, getState) => {
  dispatch({
    type: CURRENTUSER_REQ,
  });

  try {
    const response = await axios.get(`${API}/user?userId=${id}`);

    dispatch({
      type: CURRENTUSER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const err = error.response ? error.response.data : error.message;

    dispatch({
      type: CURRENTUSER_FAIL,
      payload: err,
    });
  }
};

export const followCurrent = (id, follow) => async (dispatch, getState) => {
  try {
    await axios.put(
      `${API}/user/${id}/follow`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getState().auth.accessToken}`,
        },
      }
    );

    const userId = getState().auth.user._id;

    if (follow) {
      dispatch({
        type: UNFOLLOW_CURRENT,
        payload: userId,
      });

      dispatch({
        type: UPDATE_MY_FOLLOWING_N,
        payload: id,
      });
    } else {
      dispatch({
        type: FOLLOW_CURRENT,
        payload: userId,
      });

      dispatch({
        type: UPDATE_MY_FOLLOWING_Y,
        payload: id,
      });
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong, Try again");
  }
};

export const getCurrentUserTweets = (id) => async (dispatch) => {
  dispatch({
    type: CURRENT_USER_TWEET_REQ,
  });

  try {
    const response = await axios.get(`${API}/tweet/tweetsByUserId/${id}`);

    dispatch({
      type: CURRENT_USER_TWEET_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const err = error.response ? error.response.data : error.message;

    dispatch({
      type: CURRENT_USER_TWEET_FAIL,
      payload: err,
    });
  }
};
