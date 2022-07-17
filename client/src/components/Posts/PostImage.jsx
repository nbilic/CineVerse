const PostImage = ({ image, toggleImageModal, setImage }) => {
  return (
    <img
      src={image}
      alt=""
      className="img"
      onClick={() => {
        setImage(image);
        toggleImageModal(true);
      }}
    />
  );
};

export default PostImage;
