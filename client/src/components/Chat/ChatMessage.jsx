import ImageModal from "../Modals/ImageModal";
import useToggle from "../../hooks/useToggle";
const ChatMessage = ({ msg, user }) => {
  const [imageModal, toggleImageModal] = useToggle(false);
  return (
    <div className="chat-select" key={msg.id}>
      {imageModal && (
        <ImageModal
          setDisplay={toggleImageModal}
          display={imageModal}
          img={msg.file}
        />
      )}
      {!msg.file && (
        <p
          className={`${
            msg.sender !== user?.handle ? "left-msg" : "right-msg"
          }`}
        >
          {msg.content}
        </p>
      )}
      {msg.file && (
        <img
          onClick={toggleImageModal}
          className={`chat-img ${
            msg.sender !== user?.handle ? "left-msg" : "right-msg"
          }`}
          src={msg.file}
        />
      )}
    </div>
  );
};

export default ChatMessage;
