import { useEffect, useState, useRef } from "react";
import { BiSend } from "react-icons/bi";
import { BsImage, BsEmojiSmile } from "react-icons/bs";
import api from "../../api/api";
import "../../styles/chatbox.css";
import { useSelector } from "react-redux";
import { CgBell } from "react-icons/cg";
import ChatMessage from "./ChatMessage";
import Friend from "../Friends/Friend";

const Chatbox = () => {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const { friends: onlineFriends } = useSelector((state) => state.friends);
  const [room, setRoom] = useState(null);
  const [currentFriend, setCurrentFriend] = useState(null);
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState(false);
  const { socket } = useSelector((state) => state.socket);
  const messagesEndRef = useRef(null);
  const inputFile = useRef(null);
  const [file, setFile] = useState(null);
  const toDataURL = (img) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(reader.result);
    };
    reader.readAsDataURL(img);
  };

  const checkIfOnline = (id) => onlineFriends.find((f) => id === f._id);
  const submitMessage = () => {
    socket?.emit("pm-out", {
      room: currentFriend._id,
      msg: message,
      sender: user.handle,
      file,
    });
    !file && setMessage("");
    file && setFile(null);
  };
  const joinRoom = (handle) => {
    const roomId = makeRoomName(handle);
    setRoom(roomId);
    socket.emit("join-room", roomId);
    setMessages([]);
  };

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitMessage();
    }
  };

  const makeRoomName = (handle) =>
    user.handle > handle
      ? `${user.handle}-${handle}`
      : `${handle}-${user.handle}`;

  useEffect(() => {
    newMessage && setMessages([...messages, newMessage]);
  }, [newMessage]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await api.get(`/api/user/friends/${user._id}`);
        setFriends(response.data);
      } catch (error) {
        console.log("error => ", error);
      } finally {
        setLoading(false);
      }
    };

    user._id && getFriends();
    console.log(socket.id);
  }, [user]);

  useEffect(() => {
    socket?.on("pm", async (x) => {
      setNewMessage(x);
    });
  }, [socket]);

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    file && submitMessage();
  }, [file]);

  useEffect(() => {
    /* console.log(onlineFriends); */
  }, [onlineFriends]);
  return (
    <div className="chatbox-container">
      <div className="chat-upper-layer">
        <CgBell className="chat-bell-icon" />
        <h2>Messages</h2>
      </div>

      {!loading && (
        <div className="chatbox-container-center">
          <div className="friend-list">
            {friends.map((friend) => (
              <div
                className={`friend-chat-div ${
                  room === makeRoomName(friend.handle) && "active-chat"
                }
             
              
              `}
                key={friend._id}
                onClick={() => {
                  joinRoom(friend.handle);
                  setCurrentFriend(friend);
                }}
              >
                <div className="friend-status-container">
                  <img src={friend.avatar} alt="" className={`friend-avatar`} />
                  <div
                    className={`friend-status-block ${
                      checkIfOnline(friend._id)
                        ? "friend-online"
                        : "friend-offline"
                    }`}
                  />
                </div>

                <p>{friend.fullName}</p>
              </div>
            ))}
          </div>
          <div className="friend-private-chat">
            {currentFriend && <Friend friend={currentFriend} />}
            <div className="messages">
              {messages.map((msg) => (
                <ChatMessage msg={msg} user={user} key={msg.id} />
              ))}
              <div ref={messagesEndRef} />
            </div>
            {room && (
              <div className="chat-controlls">
                <input
                  type="text"
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  value={message}
                  className="friend-private-chat-input"
                />
                <BiSend className="chat-action-icon" onClick={submitMessage} />
                <BsEmojiSmile className="chat-action-icon" />

                <button
                  className="image-upload-button"
                  onClick={(e) => {
                    e.preventDefault();
                    inputFile.current.click();
                  }}
                >
                  <BsImage className="chat-action-icon" />
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
                {/*  <button onClick={submitMessage}>SEND</button> */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
