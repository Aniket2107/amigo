import "./messages.css";
import { formatDistance, subDays } from "date-fns";

export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {/* <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        /> */}
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">
        {formatDistance(subDays(new Date(message.createdAt), 0), new Date())}
      </div>
    </div>
  );
}
