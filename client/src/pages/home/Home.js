import { useEffect } from "react";
import AddTweet from "../../components/addTweet/AddTweet";
import ALoader from "../../components/Loader";
import Tweet from "../../components/tweet/Tweet";
import { getFeedData } from "../../redux/actions/feedActions";
import { useDispatch, useSelector } from "react-redux";

import "./home.css";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedData());
  }, [dispatch]);

  const { loading, tweets } = useSelector((state) => state.feed);

  return (
    <div className="home">
      {loading ? (
        <div className="alignHomeLoader">
          <ALoader />
        </div>
      ) : (
        <>
          <AddTweet />

          {tweets?.length > 0 ? (
            tweets?.map((tweet) => {
              return <Tweet tweet={tweet} key={tweet._id} />;
            })
          ) : (
            <h3>Sorry no posts, Please follow someone or post something</h3>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
