import { FaRegComments } from "react-icons/fa";
import { RiDislikeLine, RiHeart2Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import Reply from "./Reply";
import "../styles/post.css";
import { useEffect, useState } from "react";
import Replies from "./Replies";
import ReactTimeAgo from "react-time-ago";
import PostOptions from "./PostOptions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import apiUrl from "../components/API_URL";
import axios from "axios";
import ImageModal from "./ImageModal";
import VotedBy from "./VotedBy";
const Post = ({ post, user: originalPoster, removePost }) => {
  const navigate = useNavigate();
  const [replies, setReplies] = useState([]);
  const [options, setOptions] = useState(false);
  const [imgModal, setImgModal] = useState(false);
  const [votesModal, setVotesModal] = useState(false);
  const [votesModalMode, setVotesModalMode] = useState();
  const { user } = useSelector((state) => state.user);
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

  const routeToProfile = (handle) => {
    navigate(`/profile/${handle}`);
  };

  const ratePost = async (vote) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/post/vote/${post._id}`,
        {
          vote,
          activeUser: user._id,
        },
        { withCredentials: true }
      );

      setPostDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async () => {
    try {
      await axios.delete(`${apiUrl}/api/post/${post._id}`, {
        withCredentials: true,
      });
      removePost(post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    /* console.log(post.replies); */
    const getReplies = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/post/replies/${post._id}`,
          {
            withCredentials: true,
          }
        );
        setReplies(response.data);
      } catch (error) {
        console.log("error => ", error);
      }
    };
    post.replies.length && getReplies();
    /* post.replies && setReplies([...post.replies]); */
  }, []);
  return (
    <div className="post-card">
      {imgModal && (
        <ImageModal
          setDisplay={setImgModal}
          display={imgModal}
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
          setDisplay={setVotesModal}
          display={votesModal}
        />
      )}
      <div className="post-container">
        <div className="post-details">
          <img
            src={originalPoster?.avatar}
            alt=""
            className="user-img-post"
            onClick={() => routeToProfile(originalPoster.handle)}
          />
          <div className="post-details-info">
            <p
              className="user-username"
              onClick={() => routeToProfile(originalPoster.handle)}
            >
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
              onClick={() => setImgModal(true)}
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
              setVotesModal(true);
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
              setVotesModal(true);
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
