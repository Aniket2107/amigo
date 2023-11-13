import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../../helpers/API";
import "./conversation.css";

export default function Conversation({
  conversation,
  currentUser,
  idx,
  isActive,
}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios(`${API}/user?userId=${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className={`conversation ${isActive ? "cv_1" : ""}`}>
      <span style={{ marginRight: "10px" }}>{idx + 1}. </span>
      <img className="conversationImg" src={user?.avatar} alt="" />
      <span className="conversationName">{user?.name}</span>
    </div>
  );
}
