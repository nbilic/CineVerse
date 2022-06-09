import { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import "../styles/replies.css";
import { useSelector } from "react-redux";
import { TiDelete } from "react-icons/ti";
import axios from "axios";
import ConfirmAction from "./ConfirmAction";
import apiUrl from "./API_URL";
const Replies = ({ reply, removeReply }) => {
  const { user } = useSelector((state) => state.user);
  const [displayConfirmAction, setDisplayConfirmAction] = useState(false);
  const deleteReply = async () => {
    setDisplayConfirmAction(false);
    try {
      await axios.delete(`${apiUrl}/api/post/reply/${reply._id}`, {
        withCredentials: true,
      });
      removeReply(reply);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (displayConfirmAction) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [displayConfirmAction]);
  return (
    <div className="reply-box">
      <img src={reply?.avatar} alt="" className="user-img-comment" />
      <div className="reply-content-container">
        <div className="triangle"></div>
        <div className="inner-triangle"></div>
        <div className="reply-upper">
          <p className="reply-username">{`${reply.firstName} ${reply.lastName}`}</p>
          <p className="published">
            <ReactTimeAgo date={new Date(reply.createdAt)} locale="en-US" />
          </p>
          {user._id === reply.author && (
            <TiDelete
              className="reply-delete-icon"
              onClick={() => setDisplayConfirmAction(true)}
            />
          )}
        </div>
        <div className="reply-content">{reply.content}</div>
      </div>

      {displayConfirmAction && (
        <ConfirmAction
          setDisplayConfirmAction={setDisplayConfirmAction}
          deleteReply={deleteReply}
        />
      )}
    </div>
  );
};

export default Replies;
