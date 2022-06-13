import Navbar from "../components/Navbar";
import Shortcuts from "../components/Shortcuts";
import UserDisplay from "../components/UserDisplay";
import ProfileDisplay from "../components/ProfileDisplay";
import "../styles/profile.css";
import { useState, useEffect } from "react";
import Post from "../components/Post";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import api from "../api/api";
import { useSelector } from "react-redux";
const Profile = () => {
  const [user, setUser] = useState(null);
  const { user: activeUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
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

        /* console.log(response.data); */
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
        if (handle === activeUser.handle) setUser(activeUser);
        //console.log(user.handle,handle);
        else {
          const response = await api.get(`/api/user/single/${handle}`);
          setUser(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [handle, activeUser]);

  return (
    <div className="profile">
      <Navbar />
      {loading && <Loading />}
      <div className="main-content grid-container">
        <div className="sidebar">
          <UserDisplay />
          <Shortcuts />
        </div>

        <div className="">
          <ProfileDisplay profile={user} />

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
