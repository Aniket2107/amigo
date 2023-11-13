import { formatDistance, subDays } from "date-fns";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import { addComment, toggleLike } from "../../redux/actions/feedActions";

import "./tweet.css";
import {
  commentLikedTweet,
  likeLikedTweet,
} from "../../redux/actions/userLikedAction";

const Tweet = ({ tweet, userLiked }) => {
  const [toggleComment, setToggleComment] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { commentLoad } = useSelector((state) => state.feed);

  const { commentLoad: lCommentLoad } = useSelector((state) => state.userLiked);

  const isLiked = tweet.likes.includes(user._id);

  const handleCreateLike = async () => {
    if (userLiked) {
      dispatch(
        likeLikedTweet({
          like: !isLiked,
          tweetId: tweet._id,
          userId: user._id,
        })
      );
    } else {
      dispatch(
        toggleLike({
          like: !isLiked,
          tweetId: tweet._id,
          userId: user._id,
        })
      );
    }
  };

  const handleAddComment = async () => {
    if (commentContent.length < 1) {
      toast.error("Comment cannot be empty");
      return;
    }

    if (userLiked) {
      dispatch(
        commentLikedTweet({
          tweetId: tweet._id,
          comment: commentContent,
        })
      );
    } else {
      dispatch(
        addComment({
          tweetId: tweet._id,
          comment: commentContent,
        })
      );
    }

    setCommentContent("");
  };

  return (
    <div className="tweet">
      {tweet.user?.avatar ? (
        <Link to={`/user/${tweet.user._id}`}>
          <img src={tweet.user.avatar} alt="avatar" className="tweet_avatar" />
        </Link>
      ) : (
        <i
          className="fa fa-user fa-2x tweet_avatar"
          aria-hidden="true"
          style={{ border: "none" }}
        ></i>
      )}

      <div className="tweet_container">
        <div className="tweet_container_1">
          <Link to={`/user/${tweet.user._id}`} className="td-n c-000">
            <h4>{tweet.user.name}</h4>
          </Link>
          <span>
            {formatDistance(subDays(new Date(tweet.createdAt), 0), new Date())}{" "}
            ago
          </span>
        </div>

        <Link to={`/tweet/${tweet._id}`} className="td-n c-000">
          <abbr title="Click to know more" className="td-n">
            <p style={{ cursor: "default" }}>
              {tweet.content ||
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae,impedit."}
            </p>

            {tweet.img && (
              <img src={tweet.img} alt="Tweet-img" className="tweet_img cp" />
            )}
          </abbr>
        </Link>

        <div className={`tweet_stats ${toggleComment ? "addSpace" : ""} `}>
          <div className="tweet_likes">
            <i
              className={` ${isLiked ? "fa liked" : "far"} fa-heart cp`}
              onClick={handleCreateLike}
            ></i>

            <span>{tweet.likes?.length}</span>
          </div>

          <div className="tweet_comments">
            {/* <i className="fas fa-circle-notch fa-spin"></i> */}
            <i
              className="far fa-comment cp"
              onClick={() => setToggleComment(!toggleComment)}
            ></i>
            <span>{tweet.comments?.length}</span>
          </div>
        </div>
        {toggleComment && (
          <div className="tweet_usercomment">
            <input
              type="text"
              placeholder="Write you comment..."
              value={commentContent || ""}
              onChange={(e) => setCommentContent(e.target.value)}
              minLength={3}
              required
            />
            {commentLoad || lCommentLoad ? (
              <i className="fas fa-circle-notch fa-spin"></i>
            ) : (
              <span onClick={handleAddComment}>Post</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tweet;
