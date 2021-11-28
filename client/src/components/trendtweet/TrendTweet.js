import { format } from "date-fns";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Modal from "react-modal";

import "./trendtweet.css";
import { editCustomStyle } from "./style";
import { deleteTweet, editTweet } from "../../redux/actions/myTweetsActions";

const TrendTweet = ({ tweet, update }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updatedTweet, setUpdatedTweet] = useState(tweet.content);

  const history = useHistory();
  const dispatch = useDispatch();

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const linkTweet = () => {
    history.push(`/tweet/${tweet._id}`);
  };

  const handelUpdateTweet = async (e) => {
    e.preventDefault();

    dispatch(
      editTweet({
        tweetId: tweet._id,
        content: updatedTweet,
      })
    );

    closeModal();
  };

  const handledeleteTweet = async () => {
    let conf = window.confirm("Are you sure you want to delete?");
    if (conf) {
      dispatch(deleteTweet(tweet._id));
    }
  };

  return (
    <div className="trendtweet cp">
      <div className="trendtweet_container" onClick={linkTweet}>
        {tweet.user?.avatar ? (
          <img
            src={tweet.user.avatar}
            alt="avatar"
            className="trendtweet_avatar"
          />
        ) : (
          <i
            className="fa fa-user fa-2x trendtweet_avatar"
            aria-hidden="true"
            style={{ border: "none" }}
          ></i>
        )}
        <span className="trendtweet_caption">{tweet.content}</span>
        {tweet.createdAt && (
          <span>{format(new Date(tweet.createdAt), "dd/MM/yy")}</span>
        )}
      </div>
      <div className="trendtweet_stats" onClick={linkTweet}>
        <div className="tweet_likes">
          <i className="far fa-heart"></i>
          <span>{tweet.likes?.length}</span>
        </div>
        <div className="tweet_comments">
          <i className="far fa-comment"></i>
          <span>{tweet.comments?.length}</span>
        </div>
      </div>

      {update && (
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          contentLabel="Modal"
          style={editCustomStyle}
          ariaHideApp={false}
        >
          <form onSubmit={handelUpdateTweet} className="form-control">
            <input
              type="text"
              value={updatedTweet}
              onChange={(e) => setUpdatedTweet(e.target.value)}
              required
              minLength={2}
            />
            <button type="submit" className="trend__tweet__editBtn">
              <i className="fas fa-edit" style={{ color: "#047aed" }}></i>
            </button>
          </form>
        </Modal>
      )}

      {update && (
        <div className="trendtweet_update">
          <i
            className="fas fa-edit"
            style={{ color: "#047aed" }}
            onClick={openModal}
          ></i>
          <i
            className="fas fa-trash"
            style={{ color: "red" }}
            onClick={handledeleteTweet}
          ></i>
        </div>
      )}
    </div>
  );
};

export default TrendTweet;
