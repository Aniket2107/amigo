import React, { useEffect, useState } from "react";

import Modal from "react-modal";
import { customStyles } from "./modalStyles";

import "./addConvo.css";
import { useDispatch, useSelector } from "react-redux";
import { getFollowData } from "../../redux/actions/authActions";
import { toast } from "react-toastify";
import axios from "axios";
import { API } from "../../helpers/API";

const AddConvo = ({ conversations, getConversations }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFollowData());
  }, [dispatch]);

  const { following, user } = useSelector((state) => state.auth);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  // console.log("nice", conversations);
  const addConversation = async (receiverId) => {
    const exists = conversations.some((el) => el.members.includes(receiverId));

    if (exists) {
      toast.error("Conversation already exists");
      return;
    }

    try {
      await axios.post(`${API}/conversations/`, {
        senderId: user._id,
        receiverId: receiverId,
      });

      getConversations();

      toast.success("Conversation added");
    } catch (error) {
      toast.error("Something went wrong, Try again");
    }
  };

  let filteredUsers = [];

  if (following) {
    filteredUsers = following.filter((user) => {
      return user.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }

  return (
    <div>
      <div onClick={openModal} className="addConvo_head">
        <i className="fas fa-user-plus"></i>
      </div>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        style={customStyles}
        ariaHideApp={false}
      >
        <input
          type="text"
          value={searchQuery}
          placeholder="Search users.."
          onChange={(e) => setSearchQuery(e.target.value)}
          className="customModal_input"
          required
        />

        {filteredUsers.length > 0 &&
          filteredUsers.map((user) => {
            return (
              <div className="add_user_conversation" key={user._id}>
                <div className="flex">
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="customModal_avatar"
                  />
                  <p className="ml-3">{user.name}</p>
                </div>
                <div
                  onClick={() => addConversation(user._id)}
                  className="customModal_btn"
                >
                  <i className="fas fa-user-plus"></i>
                </div>
              </div>
            );
          })}

        {searchQuery.length !== 0 && filteredUsers.length < 1 && (
          <p style={{ color: "red" }}>Sorry no user found</p>
        )}
      </Modal>
    </div>
  );
};

export default AddConvo;
