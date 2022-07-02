import { useEffect, useState, useRef } from "react";
import { BiSend } from "react-icons/bi";
import { BsImage, BsEmojiSmile } from "react-icons/bs";
import api from "../../api/api";
import "../../styles/chatbox.css";
import { useSelector } from "react-redux";
import { CgBell } from "react-icons/cg";
import ChatMessage from "./ChatMessage";
import Friend from "../Friends/Friend";
import { toDataURL } from "../../functions/convertImage";

const Chatbox = () => {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const { friends: onlineFriends } = useSelector((state) => state.friends);
  const [room, setRoom] = useState(null);
  const [currentFriend, setCurrentFriend] = useState(null);
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const [singleChatMessages, setSingleChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState(false);
  const { socket } = useSelector((state) => state.socket);
  const messagesEndRef = useRef(null);
  const inputFile = useRef(null);
  const [file, setFile] = useState(null);

  const checkIfOnline = (id) => onlineFriends.find((f) => id === f._id);
  const submitMessage = () => {
    socket?.emit("pm-out", {
      room: currentFriend._id,
      msg: message,
      sender: user.handle,
      receiver: currentFriend.handle,
      file,
    });
    !file && setMessage("");
    file && setFile(null);
  };
  const joinRoom = (handle) => {
    const roomId = makeRoomName(handle);
    setRoom(roomId);
    socket.emit("join-room", roomId);
    /*  setMessages([]); */
  };

  const changeMessageDisplay = (handle) => {
    setSingleChatMessages(messages.find((m) => m.userHandle === handle));
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
    if (newMessage) {
      let userChat = messages?.find(
        (user) =>
          user.userHandle === newMessage.receiver ||
          user.userHandle === newMessage.sender
      );
      if (userChat) {
        const X = messages?.map((m) => {
          if (
            m.userHandle !== newMessage.receiver &&
            m.userHandle !== newMessage.sender
          )
            return m;
          return {
            userHandle: m.userHandle,
            messages: [...m.messages, newMessage],
          };
        });
        setMessages(X);
      } else {
        setMessages([
          ...messages,
          {
            userHandle:
              newMessage.receiver === user.handle
                ? newMessage.sender
                : newMessage.receiver,
            messages: [newMessage],
          },
        ]);
      }
    }
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
                  changeMessageDisplay(friend.handle);
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
              {messages
                .find((user) => user.userHandle === currentFriend?.handle)
                ?.messages?.map((msg) => (
                  <ChatMessage msg={msg} user={user} key={msg.id} />
                ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      )}

      <div className="chat-controlls">
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          value={message}
          disabled={!room}
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
            toDataURL(e.target.files[0], setFile);
          }}
          ref={inputFile}
          accept="image/png, image/jpeg"
          hidden
        />
        {/*  <button onClick={submitMessage}>SEND</button> */}
      </div>
    </div>
  );
};

export default Chatbox;
