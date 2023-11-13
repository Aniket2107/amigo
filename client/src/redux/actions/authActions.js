import {
  LOAD_PROFILE,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  EDIT_PROFILE_REQ,
  EDIT_PROFILE_FAIL,
  EDIT_PROFILE_SUCCESS,
  GET_FOLLOWING_REQ,
} from "../types";
import { API } from "../../helpers/API";

import { toast } from "react-toastify";
import axios from "axios";

export const login = (data) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const response = await axios.post(`${API}/auth/login`, data);

    localStorage.setItem("amigo-token", response.data.token);
    localStorage.setItem("amigo-user", JSON.stringify(response.data.user));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data.token,
    });

    dispatch({
      type: LOAD_PROFILE,
      payload: response.data.user,
    });

    toast.success("Login success");
  } catch (error) {
    // console.log(error);
    const err = error.response ? error.response.data : error.message;

    dispatch({
      type: LOGIN_FAIL,
      payload: err,
    });

    toast.error(err);
  }
};

export const register = (data) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const response = await axios.post(`${API}/auth/register`, data);

    localStorage.setItem("amigo-token", response.data.token);
    localStorage.setItem("amigo-user", JSON.stringify(response.data.user));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data.token,
    });

    dispatch({
      type: LOAD_PROFILE,
      payload: response.data.user,
    });

    toast.success("Register success");
  } catch (error) {
    const err = error.response ? error.response.data : error.message;

    dispatch({
      type: LOGIN_FAIL,
      payload: err,
    });

    toast.error(err);
  }
};

export const getFollowData = () => async (dispatch, getState) => {
  dispatch({
    type: GET_FOLLOWING_REQ,
  });

  try {
    const userId = getState().auth.user._id;

    const res1 = await axios.get(`${API}/user/followers/${userId}`);
    const res2 = await axios.get(`${API}/user/following/${userId}`);

    dispatch({
      type: GET_FOLLOWERS,
      payload: res1.data,
    });

    dispatch({
      type: GET_FOLLOWING,
      payload: res2.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUserData = (data, userId) => async (dispatch, getState) => {
  dispatch({
    type: EDIT_PROFILE_REQ,
  });

  try {
    await axios.put(`${API}/user/${userId}`, data, {
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    dispatch({
      type: EDIT_PROFILE_SUCCESS,
      payload: data,
    });

    toast.success("Profile updated");
  } catch (error) {
    const err = error.response ? error.response.data : error.message;

    dispatch({
      type: EDIT_PROFILE_FAIL,
      payload: err,
    });

    toast.error(err);
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });

  localStorage.removeItem("amigo-token");
  localStorage.removeItem("amigo-user");

  toast.success("Logout success");
};
