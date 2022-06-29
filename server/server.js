const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const deserializeUser = require("./middleware/deserializeUser.js");
const { addNewUser, removeUser } = require("./sockets/actions");
const http = require("http");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");

dotenv.config();

//Routes
const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");
const userRoute = require("./routes/userRoute");
const movieRoute = require("./routes/moviesRoute");
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

//DB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

//Middleware
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:8080"],
    credentials: true,
  })
);

app.use(deserializeUser);
app.use("/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/user", userRoute);
app.use("/api/movie", movieRoute);
const PORT = process.env.PORT || 8080;

let onlineUsers = [];

io.on("connection", async (socket) => {
  socket.on("RATED", ({ vote, id }) => {
    const online = onlineUsers.find((r) => r._id.toString() === id.toString());
    console.log(onlineUsers.length);
    online && io.to(online.socketId).emit("inf", vote);
  });

  socket.on("join-room", (room) => {
    socket.join(room);
  });
  socket.on("pm-out", ({ room, msg, sender, file, receiver }) => {
    const user = onlineUsers.find((u) => u._id === room);
    io.to(user?.socketId).to(socket.id).emit("pm", {
      content: msg,
      id: uuidv4(),
      sender,
      receiver,
      file,
    });
  });

  socket.on("newUser", async ({ userId, friends }) => {
    onlineUsers = await addNewUser(userId, socket.id, onlineUsers, friends);
    let onlineFriends = [];
    onlineUsers.forEach((u) => {
      friends.forEach((f) => {
        if (f === u._id) {
          onlineFriends.push({ _id: f, socketId: u.socketId });
          io.to(u.socketId).emit("friend-online", {
            _id: userId,
            socketId: socket.id,
          });
        }
      });
    });
    io.to(socket.id).emit("online-friends", onlineFriends);
  });

  socket.on("disconnect", () => {
    const disconnectedUser = onlineUsers.filter(
      (r) => r.socketId === socket.id
    );
    onlineUsers = removeUser(socket.id, onlineUsers);
    const friendsToNotify = onlineUsers.filter((user) =>
      user.friends.includes(disconnectedUser[0]?._id)
    );
    friendsToNotify.forEach((friend) => {
      io.to(friend.socketId).emit("friend-offline", disconnectedUser[0]);
    });
  });
});

server.listen(PORT, () => {
  console.log("Socket is live");
});

/* io.listen(8080); */
