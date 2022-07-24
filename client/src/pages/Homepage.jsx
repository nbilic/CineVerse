import "../styles/homepage.css";
import Navbar from "../components/Layout/Navbar";
import CreatePost from "../components/Posts/CreatePost";
import Post from "../components/Posts/Post";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import FriendInvites from "../components/Friends/FriendInvites";
import api from "../api/api";
import RotateLoader from "react-spinners/RotateLoader";
import OnlineFriends from "../components/Friends/OnlineFriends";
import Calendar from "../components/Layout/Calendar";
import SearchUsers from "../components/Layout/SearchUsers";

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
        <div className="center grid-item">
          <div className="posts-container">
            <CreatePost addNewPost={addNewPost} />

            <div className="test-cont">
              <div className="posts-container-homepage">
                {loading && (
                  <div className="loader-container">
                    <RotateLoader size={10} loading={loading} margin="2" />
                  </div>
                )}
                {posts?.map((post) => (
                  <Post
                    key={post?.post._id}
                    post={post.post}
                    user={post.user}
                    removePost={removePost}
                  />
                ))}
              </div>
              <div className="sidebar-content desktop-position">
                <SearchUsers />
                <FriendInvites />
                {/* <RecentActivity /> */}
                <OnlineFriends />
                <Calendar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
