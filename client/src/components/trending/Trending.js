import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ALoader from "../Loader";
import TrendTweet from "../trendtweet/TrendTweet";
import { getTrendTweets } from "../../redux/actions/trendActions";

import "./trending.css";

function Trending() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrendTweets());
  }, [dispatch]);

  const { trendTweets, loading } = useSelector((state) => state.trend);

  if (loading) {
    return (
      <div className="alignHomeLoader">
        <ALoader />
      </div>
    );
  }

  return (
    <div className="trending">
      <h3>Trending</h3>
      {trendTweets &&
        trendTweets?.map((tweet) => {
          return <TrendTweet tweet={tweet} key={tweet._id} />;
        })}
    </div>
  );
}

export default Trending;
