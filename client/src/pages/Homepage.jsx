import "../styles/homepage.css";
import Navbar from "../components/Navbar";
import Shortcuts from "../components/Shortcuts";
import CreatePost from "../components/CreatePost";
import FriendsDisplay from "../components/FriendsDisplay";
import Post from "../components/Post";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import FriendInvites from "../components/FriendInvites";
import axios from "axios";
import apiUrl from "../components/API_URL";
import RecentUsers from "../components/RecentUsers";
import UserDisplay from "../components/UserDisplay";
const Homepage = () => {
  const { user } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const addNewPost = (post) => {
    setPosts([{ user, post }, ...posts]);
  };

  const removePost = (post) => {
    const filteredPosts = posts.filter((p) => p.post._id !== post._id);
    setPosts([...filteredPosts]);
  };
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/post/timeline/${user._id}`,
          { params: { count: 10 }, withCredentials: true }
        );

        setPosts([...response.data]);
      } catch (error) {
        console.log("error => ", error);
      }
    };

    user?._id && getPosts();
  }, [user]);

  return (
    <div className="homepage">
      <Navbar />

      <div className="main-content grid-container">
        <div className="y">
          <UserDisplay />
          <Shortcuts />
          <RecentUsers />
        </div>

        <div className="center">
          <CreatePost addNewPost={addNewPost} />
          {posts?.map((post) => (
            <Post
              key={post?.post._id}
              post={post.post}
              user={post.user}
              removePost={removePost}
            />
          ))}
        </div>

        <div className="x">
          <FriendInvites />
          <FriendsDisplay />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
