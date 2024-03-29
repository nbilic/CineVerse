import { useState } from "react";
import { BiSend } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";
import { useSelector } from "react-redux";
import "../../styles/reply.css";
import EmotePicker from "../Emotes/EmotePicker";
import api from "../../api/api";

const Reply = ({ addReply, postId }) => {
  const { user } = useSelector((state) => state.user);
  const [display, setDisplay] = useState(false);
  const [reply, setReply] = useState({
    author: user._id,
    content: "",
    originalPost: postId,
  });
  const commitReply = async () => {
    try {
      const response = await api.post(`/api/post/reply`, {
        ...reply,
        published: new Date(),
      });
      addReply(response.data);
      resetReply();
    } catch (error) {
      console.log(error);
    }
  };

  const resetReply = () => {
    setReply({
      author: user._id,
      content: "",
      originalPost: postId,
    });
  };

  return (
    <div className="reply-section">
      <img src={user.avatar} alt="" className="user-img-reply" />
      <div className="reply-input-box">
        <textarea
          type="text"
          placeholder="Post your reply..."
          className="reply-input"
          name="content"
          value={reply?.content}
          onChange={(e) =>
            setReply({ ...reply, [e.target.name]: e.target.value })
          }
        />
        <div className="icons">
          <BiSend className="send-icon" onClick={() => commitReply()} />
          <BsEmojiSmile
            className="pick-emoji-icon"
            onClick={() => {
              setDisplay(!display);
            }}
          />
          <EmotePicker
            display={display}
            setDisplay={setDisplay}
            position="top"
            post={reply}
            setPost={setReply}
          />
        </div>
      </div>
    </div>
  );
};

export default Reply;
