import Navbar from "../components/Layout/Navbar";
import ProfileDisplay from "../components/Profile/ProfileDisplay";
import "../styles/profile.css";
import { useState, useEffect } from "react";
import Post from "../components/Posts/Post";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { useSelector } from "react-redux";
import RotateLoader from "react-spinners/RotateLoader";
import Activity from "../components/Profile/Activity";
import AboutMe from "../components/Profile/AboutMe";
import Friends from "../components/Profile/Friends";
import Groups from "../components/Profile/Groups";
import Movies from "../components/Profile/Movies";
import Media from "../components/Profile/Media";

const [ACTIVITY, ABOUTME, FRIENDS, GROUPS, MOVIES, MEDIA] = [
  "ACTIVITY",
  "ABOUTME",
  "FRIENDS",
  "GROUPS",
  "MOVIES",
  "MEDIA",
];

const Profile = () => {
  const [user, setUser] = useState(null);
  const { user: activeUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { handle } = useParams();
  const [tab, setTab] = useState(ACTIVITY);
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
        setTab(ACTIVITY);
        if (handle === activeUser.handle) setUser(activeUser);
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
      {!loading && <ProfileDisplay profile={user} setTab={setTab} />}
      <div className="main-content grid-container">
        <div className="">
          {loading && (
            <div className="loader-container">
              <RotateLoader color="lightblue" size={10} loading={loading} />
            </div>
          )}
          {!loading && tab === ACTIVITY && (
            <Activity posts={posts} removePost={removePost} />
          )}
          {!loading && tab === ABOUTME && <AboutMe />}
          {!loading && tab === FRIENDS && <Friends id={user._id} />}
          {!loading && tab === GROUPS && <Groups />}
          {!loading && tab === MOVIES && <Movies />}
          {!loading && tab === MEDIA && <Media />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
