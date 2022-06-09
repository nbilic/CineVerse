import { MdDelete } from "react-icons/md";
import { RiShareBoxFill } from "react-icons/ri";
import { useEffect, useRef } from "react";
import "../styles/postOptions.css";

const PostOptions = ({ options, setOptions, deletePost, displayDelete }) => {
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (options && ref.current && !ref.current.contains(e.target)) {
        setOptions(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [options]);

  return (
    <div className="post-options-card" ref={ref}>
      {displayDelete && (
        <div className="option delete-post" onClick={deletePost}>
          <MdDelete className="option-icon" />
          <p>Delete</p>
        </div>
      )}
      <div className="option share-post">
        <RiShareBoxFill className="option-icon" />
        <p>Share post</p>
      </div>
    </div>
  );
};

export default PostOptions;
