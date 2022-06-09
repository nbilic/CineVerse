import { useState, useRef } from "react";
import { BiSend } from "react-icons/bi";
import { BsImage, BsEmojiSmile } from "react-icons/bs";
import { CgCloseR } from "react-icons/cg";
import "../styles/createPost.css";
import EmotePicker from "./EmotePicker";
import axios from "axios";
import { useSelector } from "react-redux";
import apiUrl from "./API_URL";

const CreatePost = ({ addNewPost }) => {
  const inputFile = useRef(null);
  const [display, setDisplay] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [post, setPost] = useState({
    username: `${user.firstName} ${user.lastName}`,
    content: "",
  });
  const [file, setFile] = useState(null);

  const checkIfValidPost = () => file || post.content;

  const commitPost = async () => {
    try {
      if (!checkIfValidPost()) return;
      const response = await axios.post(
        `${apiUrl}/api/post/create`,
        {
          content: post.content,
          author: user._id,
          image: file,
          publishedAt: new Date(),
        },
        { withCredentials: true }
      );

      addNewPost(response.data);
      setPost({
        ...post,
        content: "",
      });
      setFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  /*   const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  }; */

  const toDataURL = (img) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(reader.result);
    };
    reader.readAsDataURL(img);
    console.log(file);
  };

  const removeImage = () => setFile(null);

  return (
    <div className="create-post-div">
      <form className="container">
        <img src={user.avatar} alt="profile-picture" className="user-img" />
        <div className="post-box">
          <textarea
            className="post-textarea"
            name="content"
            placeholder="What's going on?"
            value={post.content}
            onChange={(e) =>
              setPost({ ...post, [e.target.name]: e.target.value })
            }
          ></textarea>
          <BiSend className="commit-post-icon post-icon" onClick={commitPost} />
          <BsEmojiSmile
            className="post-icon"
            onClick={() => {
              setDisplay(!display);
            }}
          />
          {display && (
            <EmotePicker
              display={display}
              setDisplay={setDisplay}
              post={post}
              setPost={setPost}
              position="bottom"
            />
          )}
          <button
            className="image-upload-button"
            onClick={(e) => {
              e.preventDefault();
              inputFile.current.click();
            }}
          >
            <BsImage className="post-icon" />
          </button>

          <input
            type="file"
            onChange={(e) => {
              toDataURL(e.target.files[0]);
            }}
            ref={inputFile}
            accept="image/png, image/jpeg"
            hidden
          />
          {/* {file && (
          <div className="pending-img">
            <img src={file} className="submitted-img" />
            <CgCloseR className="close-icon" onClick={removeImage} />
          </div>
        )}
        <div className="post-menu">
          <button
            className="image-upload-button"
            onClick={() => inputFile.current.click()}
          >
            <BsImage className="menu-item" />
          </button>

          <input
            type="file"
            onChange={handleChange}
            ref={inputFile}
            accept="image/png, image/jpeg"
            hidden
          />
 
      
          </div>
          */}
        </div>
      </form>

      {file && (
        <div className="pending-img">
          <img src={file} className="submitted-img" />
          <CgCloseR className="close-icon" onClick={removeImage} />
        </div>
      )}
    </div>
  );
};

export default CreatePost;
