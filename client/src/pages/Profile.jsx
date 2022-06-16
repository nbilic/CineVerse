import Navbar from "../components/Layout/Navbar";
import Shortcuts from "../components/Layout/Shortcuts";
import UserDisplay from "../components/Layout/UserDisplay";
import ProfileDisplay from "../components/Profile/ProfileDisplay";
import "../styles/profile.css";
import { useState, useEffect } from "react";
import Post from "../components/Posts/Post";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { useSelector } from "react-redux";

import RotateLoader from "react-spinners/RotateLoader";
import FriendsDisplay from "../components/Friends/FriendsDisplay";
const Profile = () => {
  const [user, setUser] = useState(null);
  const { user: activeUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { handle } = useParams();
  const removePost = (post) => {
    const filteredPosts = posts.filter((p) => p.post._id !== post._id);
    setPosts([...filteredPosts]);
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/post/user/${user._id}`, {
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

  useEffect(() => {
    const getUser = async () => {
      setPosts([]);
      try {
        setLoading(true);
        if (handle === activeUser.handle) setUser(activeUser);
        //console.log(user.handle,handle);
        else {
          const response = await api.get(`/api/user/single/${handle}`);
          setUser(response.data);
        }
      } catch (error) {
        console.log(error);
      } /* finally {
        setLoading(false);
      } */
    };
    getUser();
  }, [handle, activeUser]);

  return (
    <div className="profile">
      <Navbar />
      <div className="main-content grid-container">
        <div className="sidebar">
          <UserDisplay />
          <Shortcuts />
        </div>

        <div className="">
          {!loading && <ProfileDisplay profile={user} />}
          {loading && (
            <div className="loader-container">
              <RotateLoader color="lightblue" size={10} loading={loading} />
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

        {/*   <div className="x">
          <FriendsDisplay />
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
