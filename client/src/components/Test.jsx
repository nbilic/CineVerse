import { io } from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Friend from "./Friend";
import "../styles/test.css";
import { disableScroll } from "../functions/modifyScroll";

const Test = () => {
  const messagesEndRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const { user } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState(null);

  const sendMessage = () => {
    const { fullName, handle, _id } = user;
    const payload = { fullName, handle, _id };
    socket.emit("newMessage", { payload, message });
    setMessage("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };
  useEffect(() => {
    setSocket(io("http://localhost:8080"));
    disableScroll();
  }, []);

  useEffect(scrollToBottom, [messages]);
  useEffect(() => {
    newMessage && setMessages([...messages, newMessage]);
  }, [newMessage]);

  useEffect(() => {
    user && socket?.emit("newUser", { id: user._id });
    socket?.on("onlineUsers", (onlineUsers) => {
      setUsers(onlineUsers);
    });

    socket?.on("new message", async (payload) => {
      console.log(payload);
      setNewMessage(payload);
    });
  }, [user, socket]);

  return (
    <div className="chat-stuff-container">
      <div className="logged-in-as">
        Logged in as: <Friend friend={user} />
      </div>
      <div className="container">
        <h2>Chat stuff</h2>

        <div className="middle">
          <div className="online-users">
            {users.map((user) => (
              <Friend friend={user} key={user._id} />
            ))}
          </div>
          <div className="chatbox">
            {messages.map((msg) => (
              <div key={msg?.message?.messageId} className="chat-msg-container">
                <p className="chat-handle"> @{msg?.user?.handle}</p>
                <p className="chat-msg">{msg?.message?.message}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="input-div">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {/* <button onClick={sendMessage}>Submit</button> */}
        </div>
      </div>
    </div>
  );
};

export default Test;
