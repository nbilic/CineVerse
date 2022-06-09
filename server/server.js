const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const deserializeUser = require("./middleware/deserializeUser.js");
dotenv.config();

//Routes
const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");
const userRoute = require("./routes/userRoute");
const app = express();

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
    origin: ["http://localhost:3000", "https://good-books-test.netlify.app"],
    credentials: true,
  })
);

app.use(deserializeUser);
app.use("/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/user", userRoute);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
