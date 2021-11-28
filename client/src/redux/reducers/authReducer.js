import {
  GET_FOLLOWERS,
  GET_FOLLOWING,
  LOAD_PROFILE,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  EDIT_PROFILE_REQ,
  EDIT_PROFILE_FAIL,
  EDIT_PROFILE_SUCCESS,
  UPDATE_MY_FOLLOWING_Y,
  UPDATE_MY_FOLLOWING_N,
  GET_FOLLOWING_REQ,
} from "../types";

const inititlState = {
  accessToken: localStorage.getItem("amigo-token")
    ? localStorage.getItem("amigo-token")
    : null,
  user: localStorage.getItem("amigo-user")
    ? JSON.parse(localStorage.getItem("amigo-user"))
    : null,
  loading: false,
  error: null,
  following: [],
  followers: [],
  followLoad: false,
  updateLoading: false,
  updateError: null,
};

export const authReducer = (state = inititlState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload,
        loading: false,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        accessToken: null,
        loading: false,
        error: action.payload,
        user: null,
      };

    case LOAD_PROFILE:
      return {
        ...state,
        user: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        accessToken: null,
        loading: false,
        error: null,
      };

    case GET_FOLLOWERS:
      return {
        ...state,
        followers: action.payload,
      };

    case GET_FOLLOWING_REQ:
      return {
        ...state,
        followLoad: true,
      };

    case GET_FOLLOWING:
      return {
        ...state,
        followLoad: false,
        following: action.payload,
      };

    case EDIT_PROFILE_REQ:
      return {
        ...state,
        updateLoading: true,
      };

    case EDIT_PROFILE_FAIL:
      return {
        ...state,
        updateError: action.payload,
      };

    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        user: {
          ...state.user,
          website: action.payload.website,
          bio: action.payload.bio,
          location: action.payload.location,
          avatar: action.payload.avatar,
        },
      };

    case UPDATE_MY_FOLLOWING_Y:
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };

    case UPDATE_MY_FOLLOWING_N:
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.following.filter((fl) => fl !== action.payload),
        },
      };
    default:
      return state;
  }
};
