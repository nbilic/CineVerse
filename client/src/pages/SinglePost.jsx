import Post from "../components/Posts/Post";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import api from "../api/api";
import RotateLoader from "react-spinners/RotateLoader";
import Navbar from "../components/Layout/Navbar";
import UserDisplay from "../components/Layout/UserDisplay";
import Shortcuts from "../components/Layout/Shortcuts";
import "../styles/singlePostContainer.css";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const getUser = async (_id) => {
    try {
      const response = await api.get("/api/user/users", {
        params: { users: [_id] },
      });
      setUser(response.data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getPost = async () => {
    try {
      const response = await api.get(`api/post/specific-post/${id}`);
      setPost(response.data);
      getUser(response.data.author);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, [id]);
  return (
    <div className="single-post-container">
      <Navbar />

      <div className="grid-container">
        <div className="sidebar">
          <UserDisplay />
          <Shortcuts />
        </div>

        <div className="s-c">
          {loading && (
            <div className="loader-container">
              <RotateLoader color="lightblue" size={10} loading={loading} />
            </div>
          )}

          {!loading && <Post post={post} user={user} />}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
