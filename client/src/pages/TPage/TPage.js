import { formatDistance, subDays } from "date-fns";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import "../../components/tweet/tweet.css";
import "./tpage.css";

import ALoader from "../../components/Loader";
import {
  getCurrentTweet,
  currentTweeetToggleLike,
  currentTweeetaddComment,
} from "../../redux/actions/currentTweetActions";

const TPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [toggleComment, setToggleComment] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  const { id } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  function preload() {
    dispatch(getCurrentTweet(id)).then((res) => {
      setIsLoading(false);
    });
  }

  isLoading && preload();

  const { currentTweet, loading, commentLoad } = useSelector(
    (state) => state.currentTweet
  );

  const { user } = useSelector((state) => state.auth);

  const isLiked = currentTweet.likes?.includes(user._id);

  const handleCreateLike = async () => {
    dispatch(
      currentTweeetToggleLike({
        like: !isLiked,
        tweetId: currentTweet._id,
      })
    );
  };

  const handleAddComment = async () => {
    if (commentContent.length < 1) {
      toast.error("Comment cannot be empty");
      return;
    }

    dispatch(
      currentTweeetaddComment({
        tweetId: currentTweet._id,
        comment: commentContent,
      })
    );

    setCommentContent("");
  };

  const handleRedirectUser = (id) => {
    history.push(`/user/${id}`);
  };

  return !loading && !isLoading ? (
    <div className="tweeet">
      <div className="tweet">
        {currentTweet.user?.avatar ? (
          <img
            src={currentTweet.user.avatar}
            alt="avatar"
            className="tweet_avatar"
          />
        ) : (
          <i className="fa fa-user fa-2x tweet_avatar" aria-hidden="true"></i>
        )}

        <div className="tweet_container">
          <div className="tweet_container_1">
            <h4>{currentTweet.user.name}</h4>
            <span>
              {formatDistance(
                subDays(new Date(currentTweet.createdAt), 0),
                new Date()
              )}{" "}
              ago
            </span>
          </div>

          <p>
            {currentTweet.content ||
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae,impedit."}
          </p>

          {currentTweet.img && (
            <img src={currentTweet.img} alt="Tweet-img" className="tweet_img" />
          )}

          <div className={`tweet_stats`}>
            <div className="tweet_likes">
              <i
                className={` ${isLiked ? "fa liked" : "far"} fa-heart cp`}
                onClick={handleCreateLike}
              ></i>

              <span>{currentTweet.likes?.length}</span>
            </div>
            <div className="tweet_comments">
              <i
                className="far fa-comment"
                onClick={() => setToggleComment(!toggleComment)}
              ></i>
              <span>{currentTweet.comments?.length}</span>
            </div>
          </div>
          {toggleComment && (
            <div className="tweeet_usercomment">
              <input
                type="text"
                placeholder="Write you comment..."
                value={commentContent || ""}
                onChange={(e) => setCommentContent(e.target.value)}
                minLength={3}
                required
              />
              {commentLoad ? (
                <i className="fas fa-circle-notch fa-spin"></i>
              ) : (
                <span onClick={handleAddComment}>Post</span>
              )}
            </div>
          )}

          <div className="tweeet_comments">
            <p className="tweeet_heading">
              {currentTweet.comments?.length} Comments
            </p>

            {currentTweet.comments.map((cmt) => {
              return (
                <div
                  className="tweeet_comment"
                  key={cmt._id}
                  onClick={() => handleRedirectUser(cmt.user._id)}
                >
                  <img
                    src={cmt.user.avatar}
                    alt="avatar"
                    className="tweeet_avatar"
                  />

                  <div className="">
                    <p>{cmt.user.name}</p>
                    <span className="tweeet_content">{cmt.comment}</span>
                  </div>

                  <span className="tweeet_comment_date">
                    {formatDistance(
                      subDays(new Date(cmt.createdAt), 0),
                      new Date()
                    )}{" "}
                    ago
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="tweeet">
      <div className="alignHomeLoader">
        <ALoader />
      </div>
    </div>
  );
};

export default TPage;
