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
const PORT = process.env.PORT || 8080;

let onlineUsers = [];

io.on("connection", async (socket) => {
  socket.on("RATED", ({ vote, id }) => {
    const online = onlineUsers.find((r) => r._id.toString() === id.toString());
    console.log(onlineUsers.length);
    online && io.to(online.socketId).emit("inf", vote);
  });
  socket.on("hi", (x) => {
    console.log(x);
  });
  socket.on("newMessage", ({ payload: user, message }) => {
    console.log(user);
    const payload = {
      user: user,
      message: { message, messageId: uuidv4() },
    };
    io.emit("new message", payload);
  });
  socket.on("newUser", async (id) => {
    onlineUsers = await addNewUser(id, socket.id, onlineUsers);
    /* io.emit("onlineUsers", onlineUsers); */
  });

  socket.on("connect", () => {
    console.log("someone connected");
  });

  socket.on("disconnect", () => {
    onlineUsers = removeUser(socket.id, onlineUsers);
    io.emit("onlineUsers", onlineUsers);
  });
});

server.listen(PORT, () => {
  console.log("Socket is live");
});

/* io.listen(8080); */
