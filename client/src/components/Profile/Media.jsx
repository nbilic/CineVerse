import { useState } from "react";
import { useEffect } from "react";
import "../../styles/media.css";

const Media = ({ posts }) => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    const getImages = () => {
      let images = [];
      posts.forEach((post) => {
        if (post.post.images) {
          post.post.images.forEach((image) => {
            images.push(image);
          });
        }
      });

      setImages(images);
    };

    getImages();
  }, []);
  return (
    <div className="media-container">
      {images.map((image) => (
        <img src={image} alt="" key={image} className="media-image" />
      ))}
    </div>
  );
};

export default Media;
