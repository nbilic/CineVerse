import { FaRegComments } from "react-icons/fa";
import { RiDislikeLine, RiHeart2Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import Reply from "../Replies/Reply";
import "../../styles/post.css";
import { useEffect, useState } from "react";
import Replies from "../Replies/Replies";
import ReactTimeAgo from "react-time-ago";
import PostOptions from "../Posts/PostOptions";
import { useSelector } from "react-redux";
import ImageModal from "../Modals/ImageModal";
import VotedBy from "./VotedBy";
import useToggle from "../../hooks/useToggle";
import useRouteToProfile from "../../hooks/useRouteToProfile";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import PostImage from "./PostImage";
const Post = ({ post, user: originalPoster, removePost }) => {
  const [replies, setReplies] = useState([]);
  const navigate = useNavigate();
  const [options, setOptions] = useState(false);
  const { socket } = useSelector((state) => state.socket);
  const [votesModalMode, setVotesModalMode] = useState();
  const [imageModal, toggleImageModal] = useToggle(false);
  const [image, setImage] = useState("");
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
      // EMIT TO USER
      socket && socket.emit("RATED", { vote, id: originalPoster._id });
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
          img={image}
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
          <div className="menu-icon">
            <FiExternalLink
              className="single-post-route menu-icon-option"
              onClick={() => navigate(`/post/${post._id}`)}
            />
            <BsThreeDotsVertical
              className="menu-icon-option"
              onClick={() => setOptions(!options)}
            />
          </div>

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
          <div className="post-images">
            {post?.images.map((image) => (
              <PostImage
                image={image}
                toggleImageModal={toggleImageModal}
                setImage={setImage}
                key={image}
              />
            ))}
          </div>
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
