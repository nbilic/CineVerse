const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { requireUser } = require("../middleware/requireUser");
const jwt = require("jsonwebtoken");
const {
  createSessionHandler,
  getSessionHandler,
  deleteSessionHandler,
} = require("../controllers/session.controller");

const generateHandle = async (fullName) => {
  let counter = 0;
  while (true) {
    const user = await User.findOne({
      handle: `${fullName.replace(" ", "")}${counter}`,
    });
    if (!user) return `${fullName.replace(" ", "")}${counter}`;
    counter++;
  }
};

//Register
router.post("/register", async (req, res) => {
  /* const usernameTaken = await User.findOne({ username: req.body.username }); */
  const emailTaken = await User.findOne({ email: req.body.email });
  /*  console.log(usernameTaken);
  if (usernameTaken)
    return res.status(500).json({ message: "Username already in use" }); */
  if (emailTaken)
    return res.status(500).json({ message: "Email already in use" });
  else {
    try {
      //Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const fullName = `${req.body.firstName} ${req.body.lastName}`;
      const handle = await generateHandle(fullName);
      //Create new user
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        fullName: fullName,
        handle: handle,
      });

      const registeredUser = await user.save();

      res.status(200).json(registeredUser);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
});

//Login and create an active session
router.post(
  "/login",
  async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(404).json({ message: "User not found" });

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword)
        return res.status(400).json({ message: "Authentication failed" });

      req.user = user;
      return next();
    } catch (error) {
      console.log("error=> ", error);
      res.status(500).json(error);
    }
  },
  createSessionHandler
);

// Gets the active session for persistent login
router.get(
  "/session",
  requireUser,
  async (req, res, next) => {
    const user = await User.findOne({ email: req.user.email });
    req.activeUser = user;
    return next();
  },
  getSessionHandler
);

// Logs the user out and deletes the active session
router.delete("/session", requireUser, deleteSessionHandler);

module.exports = router;
