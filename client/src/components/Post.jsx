import { FaRegComments } from "react-icons/fa";
import { RiDislikeLine, RiHeart2Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import Reply from "./Reply";
import "../styles/post.css";
import { useEffect, useState } from "react";
import Replies from "./Replies";
import ReactTimeAgo from "react-time-ago";
import PostOptions from "./PostOptions";
import { useSelector } from "react-redux";
import ImageModal from "./ImageModal";
import VotedBy from "./VotedBy";
import useToggle from "../hooks/useToggle";
import useRouteToProfile from "../hooks/useRouteToProfile";
import api from "../api/api";

const Post = ({ post, user: originalPoster, removePost }) => {
  const [replies, setReplies] = useState([]);
  const [options, setOptions] = useState(false);
  const [votesModalMode, setVotesModalMode] = useState();
  const [imageModal, toggleImageModal] = useToggle(false);
  const [votesModal, toggleVotesModal] = useToggle(false);
  const { user } = useSelector((state) => state.user);
  const routeToProfile = useRouteToProfile(originalPoster.handle);
  const [postDetails, setPostDetails] = useState({
    likes: post.likes,
    dislikes: post.dislikes,
    likedBy: post.likedBy,
    dislikedBy: post.dislikedBy,
  });

  const checkIfActiveUser = () => {
    return post.author === user._id;
  };

  const addReply = (reply) => {
    setReplies([...replies, reply]);
  };

  const removeReply = (reply) => {
    const filteredReplies = replies.filter((r) => r !== reply);
    setReplies(filteredReplies);
  };

  const ratePost = async (vote) => {
    try {
      const response = await api.put(`/api/post/vote/${post._id}`, {
        vote,
        activeUser: user._id,
      });

      setPostDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async () => {
    try {
      await api.delete(`/api/post/${post._id}`, {
        withCredentials: true,
      });
      removePost(post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getReplies = async () => {
      try {
        const response = await api.get(`/api/post/replies/${post._id}`, {
          withCredentials: true,
        });
        setReplies(response.data);
      } catch (error) {
        console.log("error => ", error);
      }
    };
    post.replies.length && getReplies();
  }, [post._id, post.replies.length]);
  return (
    <div className="post-card">
      {imageModal && (
        <ImageModal
          setDisplay={toggleImageModal}
          display={imageModal}
          img={post.image}
        />
      )}
      {votesModal && (
        <VotedBy
          vote={votesModalMode}
          votedBy={
            votesModalMode === "LIKE"
              ? postDetails.likedBy
              : postDetails.dislikedBy
          }
          setDisplay={toggleVotesModal}
          display={votesModal}
        />
      )}
      <div className="post-container">
        <div className="post-details">
          <img
            src={originalPoster?.avatar}
            alt=""
            className="user-img-post"
            onClick={routeToProfile}
          />
          <div className="post-details-info">
            <p className="user-username" onClick={routeToProfile}>
              {`${originalPoster?.fullName}`}{" "}
            </p>
            <p className="publish-time">
              <ReactTimeAgo date={new Date(post?.publishedAt)} locale="en-US" />
            </p>
          </div>
          <BsThreeDotsVertical
            className="menu-icon"
            onClick={() => setOptions(!options)}
          />
          <div className={`post-options-menu ${!options && "hidden"}`}>
            <PostOptions
              className="post-options-menu"
              options={options}
              setOptions={setOptions}
              deletePost={deletePost}
              displayDelete={checkIfActiveUser()}
            />
          </div>
        </div>
        <div className="post-content">
          <p className="post-text">{post?.content}</p>
          {post?.image && (
            <img
              src={post.image}
              alt=""
              className="img"
              onClick={toggleImageModal}
            />
          )}
        </div>
      </div>

      <div className="action-div">
        <div className="replies">
          <FaRegComments className="action-button" />
          <p>{replies?.length} replies</p>
        </div>
        <div className="likes">
          <RiHeart2Line
            onClick={() => ratePost("LIKE")}
            className={`action-button ${
              postDetails.likedBy.includes(user._id) && "liked"
            }`}
          />
          <p
            onClick={() => {
              setVotesModalMode("LIKE");
              toggleVotesModal(true);
            }}
          >
            {postDetails.likes} likes{" "}
          </p>
        </div>
        <div className="dislikes">
          <RiDislikeLine
            onClick={() => ratePost("DISLIKE")}
            className={`action-button ${
              postDetails.dislikedBy.includes(user._id) && "disliked"
            }`}
          />
          <p
            onClick={() => {
              setVotesModalMode("DISLIKE");
              toggleVotesModal(true);
            }}
          >
            {postDetails.dislikes} dislikes
          </p>
        </div>
      </div>
      {replies?.map((reply) => (
        <Replies reply={reply} key={reply._id} removeReply={removeReply} />
      ))}
      <Reply addReply={addReply} postId={post._id} />
    </div>
  );
};

export default Post;
