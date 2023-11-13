import { TRENDIND_REQ, TRENDING_FAIL, TRENDING_SUCCESS } from "../types";
import { toast } from "react-toastify";
import { API } from "../../helpers/API";

import axios from "axios";

export const getTrendTweets = () => async (dispatch) => {
  dispatch({
    type: TRENDIND_REQ,
  });

  try {
    const response = await axios.get(`${API}/tweet/all`);

    const tweets = await response.data
      ?.map((tweet) => tweet)
      .sort((a, b) => {
        return b.likes.length - a.likes.length;
      })
      .slice(0, 9);

    dispatch({
      type: TRENDING_SUCCESS,
      payload: tweets,
    });
  } catch (error) {
    const err = error.response ? error.response.data : error.message;

    dispatch({
      type: TRENDING_FAIL,
      payload: err,
    });

    toast.error(err);
  }
};
