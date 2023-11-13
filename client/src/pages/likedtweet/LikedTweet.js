import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ALoader from "../../components/Loader";
import Tweet from "../../components/tweet/Tweet";

import { getUserLikedData } from "../../redux/actions/userLikedAction";

import "./likedtweet.css";

function LikedTweet() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserLikedData());
  }, [dispatch]);

  const { loading, userLiked } = useSelector((state) => state.userLiked);

  return !loading ? (
    <div className="likedTweets">
      <h3>Liked Tweets</h3>

      {userLiked.length > 0 ? (
        userLiked.map((tw) => {
          return <Tweet tweet={tw} key={tw._id} userLiked={true} />;
        })
      ) : (
        <p>Sorry you do not have any likedTweets</p>
      )}
    </div>
  ) : (
    <div className="likedTweets">
      <div className="alignHomeLoader">
        <ALoader />
      </div>
    </div>
  );
}

export default LikedTweet;
