import { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import "../../styles/replies.css";
import { useSelector } from "react-redux";
import { TiDelete } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import ConfirmAction from "../Modals/ConfirmAction";
import api from "../../api/api";

const Replies = ({ reply, removeReply }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [displayConfirmAction, setDisplayConfirmAction] = useState(false);
  const deleteReply = async () => {
    try {
      await api.delete(`/api/post/reply/${reply._id}`);
      removeReply(reply);
    } catch (error) {
      console.log(error);
    } finally {
      setDisplayConfirmAction(false);
    }
  };

  const routeToProfile = (handle) => {
    navigate(`/profile/${handle}`);
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
      <img
        src={reply?.avatar}
        alt=""
        className="user-img-comment"
        onClick={() => routeToProfile(reply.handle)}
      />
      <div className="reply-content-container">
        <div className="triangle"></div>
        <div className="inner-triangle"></div>
        <div className="reply-upper">
          <p
            className="reply-username"
            onClick={() => routeToProfile(reply.handle)}
          >{`${reply.firstName} ${reply.lastName}`}</p>
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
          confirmAction={deleteReply}
          content={"Are you sure you wish to delete this reply?"}
        />
      )}
    </div>
  );
};

export default Replies;
