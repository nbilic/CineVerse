import { useSelector } from "react-redux";
import FriendInvites from "../components/FriendInvites";
import FriendsDisplay from "../components/FriendsDisplay";

import Navbar from "../components/Navbar";
import RecentUsers from "../components/RecentUsers";
import Shortcuts from "../components/Shortcuts";
import UserDisplay from "../components/UserDisplay";
import ProfileDisplay from "../components/ProfileDisplay";
import "../styles/profile.css";
import { useState, useEffect } from "react";
import Post from "../components/Post";
import apiUrl from "../components/API_URL";
import { useParams } from "react-router-dom";
import axios from "axios";
const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const { handle } = useParams();
  const removePost = (post) => {
    const filteredPosts = posts.filter((p) => p.post._id !== post._id);
    setPosts([...filteredPosts]);
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/post/user/${user._id}`,
          { params: { count: 10 }, withCredentials: true }
        );

        /* console.log(response.data); */
        setPosts([...response.data]);
      } catch (error) {
        console.log("error => ", error);
      }
    };

    user?._id && getPosts();
  }, [user]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/user/single/${handle}`);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);
  return (
    <div className="profile">
      <Navbar />

      <div className="main-content grid-container">
        <div className="y">
          <UserDisplay />
          <Shortcuts />
          {
            /*    <RecentUsers /> */
            // maybe ode things u have in common sa korisnikon
          }
        </div>

        <div className="center">
          <ProfileDisplay user={user} />
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
          {/* <FriendInvites />
          <FriendsDisplay /> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
