import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getFollowData } from "../../redux/actions/authActions";

import "./following.css";
import ALoader from "../../components/Loader";

const FollowingList = ({ user, userLiked }) => {
  return (
    <div className="following_list">
      <div>
        {user.avatar ? (
          <img src={user.avatar} alt="avatar" className="following_avatar" />
        ) : (
          <i className="fa fa-user following_avatar" aria-hidden="true"></i>
        )}

        <h4>{user.name}</h4>
      </div>

      <p className="following_follow">
        {userLiked?.followings?.includes(user._id) ? "Following" : "Follow"}
      </p>
    </div>
  );
};

function Following() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFollowData());
  }, [dispatch]);

  const {
    followers,
    followLoad,
    user: userLiked,
  } = useSelector((state) => state.auth);

  return !followLoad ? (
    <div className="following">
      <h3>Followers</h3>

      <div className="following_container">
        {followers?.length ? (
          followers?.map((user) => {
            return (
              <Link
                to={`/user/${user._id}`}
                className="td-n c-000"
                key={user._id}
              >
                <FollowingList user={user} userLiked={userLiked} />
              </Link>
            );
          })
        ) : (
          <h5>You do not follow anyone ;(</h5>
        )}
      </div>
    </div>
  ) : (
    <div className="following">
      <div className="alignHomeLoader">
        <ALoader />
      </div>
    </div>
  );
}

export default Following;
