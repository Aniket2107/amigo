import React, { useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";

import "../profile/profile.css";
import TrendTweet from "../../components/trendtweet/TrendTweet";
import ALoader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";

import {
  followCurrent,
  getCurrentUser,
  getCurrentUserTweets,
} from "../../redux/actions/currentUserAction";
import { getFollowData } from "../../redux/actions/authActions";

const User = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser(id));
    dispatch(getCurrentUserTweets(id));
  }, [id, dispatch]);

  const { currentUser, loading, ctLoad, currentUserTweets } = useSelector(
    (state) => state.currentUser
  );
  const { user } = useSelector((state) => state.auth);

  if (currentUser.email === user.email) {
    return <Redirect to="/profile" />;
  }

  const handleFollow = async (e) => {
    e.preventDefault();

    dispatch(followCurrent(currentUser._id, false));
    dispatch(getFollowData());
  };

  const handleUnFollow = async (e) => {
    e.preventDefault();
    dispatch(followCurrent(currentUser._id, true));
    dispatch(getFollowData());
  };

  return !loading ? (
    <div className="profile">
      <div className="profile_container">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt="avatar"
            className="profile_avatar"
          />
        ) : (
          <i className="fa fa-user fa-5x" aria-hidden="true"></i>
        )}
        <div className="profile_info">
          <h3>{currentUser.name}</h3>
          <p>{currentUser.bio || "Bio"}</p>
          {currentUser.location && (
            <>
              <i
                className="fa fa-map-marker"
                aria-hidden="true"
                style={{ color: "#333" }}
              ></i>
              <p style={{ display: "inline" }}>{currentUser.location}</p>
            </>
          )}
          {currentUser.website && (
            <>
              <br />
              <br />
              <i className="fas fa-link" style={{ fontSize: "12px" }}>
                {" "}
              </i>
              <a href={currentUser?.website}>{currentUser?.website}</a>
            </>
          )}
        </div>
        {user.followings?.includes(currentUser._id) ? (
          <button className="profile_editBtn" onClick={handleUnFollow}>
            Unfollow
          </button>
        ) : (
          <button className="profile_editBtn" onClick={handleFollow}>
            Follow
          </button>
        )}
      </div>

      <div className="profile_stats">
        <div className="profile_following">
          <span className="1">{currentUser.following?.length || 0}</span>
          <span className="1"> Following</span>
        </div>

        <div className="likes">
          <span className="1">{currentUser.followers?.length || 0}</span>
          <span> Followers</span>
        </div>

        <div className="tweets">
          <span className="1">{0}</span>
          <span> Tweets</span>
        </div>
      </div>
      <hr />

      {ctLoad ? (
        <div className="alignHomeLoader">
          <ALoader />
        </div>
      ) : (
        <div className="usertweet_container">
          <h3 style={{ textAlign: "center" }}>User's Tweet</h3>
          {currentUserTweets?.length === 0 && <p>The user has 0 post</p>}

          {currentUserTweets?.length > 0 &&
            currentUserTweets?.map((tweet) => {
              return <TrendTweet tweet={tweet} key={tweet._id} />;
            })}
        </div>
      )}
    </div>
  ) : (
    <div className="profile">
      <div className="alignHomeLoader">
        <ALoader />
      </div>
    </div>
  );
};

export default User;
