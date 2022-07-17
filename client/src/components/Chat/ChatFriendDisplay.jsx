const ChatFriendDisplay = ({
  friend,
  lastMessage,
  messageIsFile,
  setActiveChat,
}) => {
  return (
    <div className="chat-friend-display" onClick={() => setActiveChat(friend)}>
      <div className="chat-friend-display-avatar">
        <img
          src={friend.avatar}
          alt=""
          className="chat-friend-display-avatar"
        />
      </div>
      <div className="chat-friend-display-details">
        <span className="chat-friend-name">{friend.fullName}</span>
        {/*  <span className="last-message">
          {messageIsFile && <i>Attachment</i>}
          {!messageIsFile && (
            <p className="last-message-content">{lastMessage || "Hello"} </p>
          )}
        </span> */}
      </div>
    </div>
  );
};

export default ChatFriendDisplay;
