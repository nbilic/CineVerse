import "../styles/homepage.css";
import Navbar from "../components/Navbar";
import Shortcuts from "../components/Shortcuts";
import CreatePost from "../components/CreatePost";
import FriendsDisplay from "../components/FriendsDisplay";
import Post from "../components/Post";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import FriendInvites from "../components/FriendInvites";
import RecentUsers from "../components/RecentUsers";
import UserDisplay from "../components/UserDisplay";
import Loading from "../components/Loading";
import api from "../api/api";
const Homepage = () => {
  const { user } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const addNewPost = (post) => {
    setPosts([{ user, post }, ...posts]);
  };

  const removePost = (post) => {
    const filteredPosts = posts.filter((p) => p.post._id !== post._id);
    setPosts([...filteredPosts]);
  };

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/post/timeline/${user._id}`, {
          count: 10,
        });

        setPosts([...response.data]);
      } catch (error) {
        console.log("error => ", error);
      } finally {
        setLoading(false);
      }
    };

    user?._id && getPosts();
  }, [user]);

  return (
    <div className="homepage">
      <Navbar />

      <div className="main-content grid-container">
        <div className="grid-item sidebar">
          <UserDisplay />
          <Shortcuts />
          <RecentUsers />
        </div>

        <div className="center grid-item">
          <CreatePost addNewPost={addNewPost} />
          {loading && <Loading />}
          {posts?.map((post) => (
            <Post
              key={post?.post._id}
              post={post.post}
              user={post.user}
              removePost={removePost}
            />
          ))}
        </div>

        <div className="grid-item sidebar">
          <FriendInvites />
          <FriendsDisplay />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
