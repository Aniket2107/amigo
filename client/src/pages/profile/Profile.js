import ALoader from "../../components/Loader";
import UpdateProfile from "../../components/profile/UpdateProfile";
import TrendTweet from "../../components/trendtweet/TrendTweet";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getMyTweets } from "../../redux/actions/myTweetsActions";
import { getUserLikedData } from "../../redux/actions/userLikedAction";

import "./profile.css";
import { useHistory } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUserLikedData());
    dispatch(getMyTweets());
  }, [dispatch]);

  const { userLiked } = useSelector((state) => state.userLiked);

  const { user, loading } = useSelector((state) => state.auth);

  const { myTweetLoad, myTweets } = useSelector((state) => state.myTweets);

  return !loading ? (
    <div className="profile">
      <div className="profile_container">
        {user.avatar ? (
          <img src={user.avatar} alt="avatar" className="profile_avatar" />
        ) : (
          <i className="fa fa-user fa-5x" aria-hidden="true"></i>
        )}

        <div className="profile_info">
          <h3>{user.name}</h3>
          <p>{user.bio || "Bio"}</p>
          {user.location && (
            <>
              <i
                className="fa fa-map-marker"
                aria-hidden="true"
                style={{ color: "#333" }}
              ></i>
              <p style={{ display: "inline" }}>{user.location}</p>
            </>
          )}
          {user.website && (
            <>
              <br />
              <br />
              <i className="fas fa-link" style={{ fontSize: "12px" }}></i>
              <a href={`//${user.website}`} target="_blank" rel="noreferrer">
                {user.website}
              </a>
            </>
          )}
        </div>

        <UpdateProfile />
      </div>

      <div className="profile_stats">
        <div className="followers" onClick={() => history.push(`/followers`)}>
          <span className="1">{user.followers?.length || 0}</span>
          <span> Followers</span>
        </div>

        <div
          className="profile_following"
          onClick={() => history.push("/following")}
        >
          <span className="1">{user.followings?.length || 0}</span>
          <span className="1"> Following</span>
        </div>

        <div className="tweets" onClick={() => history.push("/liked-tweets")}>
          <span className="1">{userLiked?.length || 0}</span>
          <span> Liked Tweets</span>
        </div>

        <div className="tweets">
          <span className="1">{myTweets?.length || 0}</span>
          <span> Tweets</span>
        </div>
      </div>
      <hr />

      {myTweetLoad ? (
        <div className="alignHomeLoader">
          <ALoader />
        </div>
      ) : (
        <div className="usertweet_container">
          <h3 style={{ textAlign: "center" }}>User's Tweet</h3>
          {myTweets?.length > 0 ? (
            myTweets?.map((tweet) => {
              return <TrendTweet tweet={tweet} key={tweet._id} update={true} />;
            })
          ) : (
            <p>Sorry you do not have any tweets</p>
          )}
        </div>
      )}
    </div>
  ) : (
    <div className="alignHomeLoader">
      <ALoader />
    </div>
  );
}

export default Profile;
