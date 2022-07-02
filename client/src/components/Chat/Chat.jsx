import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { BiSend } from "react-icons/bi";
import { BsImage, BsEmojiSmile } from "react-icons/bs";
import { CgBell } from "react-icons/cg";
import ChatMessage from "./ChatMessage";
import api from "../../api/api";
import { toDataURL } from "../../functions/convertImage";
import ChatFriendDisplay from "./ChatFriendDisplay";
import "../../styles/chat.css";
import Friend from "../Friends/Friend";
const Chat = () => {
  // REDUX
  const { user } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.socket);

  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [activeChat, setActiveChat] = useState(false);
  const [newMessage, setNewMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const { friends: onlineFriends } = useSelector((state) => state.friends);
  const [file, setFile] = useState(null);

  const inputFile = useRef(null);
  const messagesEndRef = useRef(null);

  const checkIfOnline = (id) => onlineFriends.find((f) => id === f._id);

  const getLastMessageFromUser = (user) => {
    const lastMessage = messages.find(
      (m) =>
        m.userHandle === user.handle &&
        m.messages[m.messages.length - 1].content
    );
    return lastMessage;
  };
  const submitMessage = () => {
    socket?.emit("pm-out", {
      room: activeChat._id,
      msg: message,
      sender: user.handle,
      receiver: activeChat.handle,
      file,
    });
    !file && setMessage("");
    file && setFile(null);
  };
  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitMessage();
    }
  };

  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await api.get(`/api/user/friends/${user._id}`);
        setFriends(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    user._id && getFriends();
    console.log(socket.id);
  }, [user]);

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    file && submitMessage();
  }, [file]);

  useEffect(() => {
    socket?.on("pm", async (message) => {
      setNewMessage(message);
    });
  }, [socket]);

  return (
    <div className="chat">
      <div className="chat-friends-container">
        {friends.map((friend) => (
          <ChatFriendDisplay
            key={friend._id}
            friend={friend}
            setActiveChat={setActiveChat}
          />
        ))}
      </div>

      <div className="chat-window">
        {activeChat && <Friend friend={activeChat} />}
        <div className="chat-messages">
          {messages
            .find((user) => user.userHandle === activeChat?.handle)
            ?.messages?.map((msg) => (
              <ChatMessage msg={msg} user={user} key={msg.id} />
            ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input-div">
          <input
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            value={message}
            disabled={!activeChat}
            className="chat-input-element"
          />
          <div className="chat-input-div-actions">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
