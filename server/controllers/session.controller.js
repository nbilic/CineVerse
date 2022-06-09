const { getUser, invalidateSession } = require("../utils/sessions");
const { signJWT } = require("../utils/jwt.utils");
const { createSession } = require("../utils/sessions");

// login handler
const createSessionHandler = (req, res) => {
  const { email } = req.body;
  const session = createSession(email, req.body.name);

  // create access token
  const accessToken = signJWT(
    {
      email: req.body.email,
      name: req.body.name,
      sessionId: session.sessionId,
    },
    "10m"
  );

  const refreshToken = signJWT({ sessionId: session.sessionId }, "1y");

  // set access token in cookie
  res.cookie("accessToken", accessToken, {
    maxAge: 8.64e7, // 1 day
    httpOnly: true,
  });
  res.cookie("refreshToken", refreshToken, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
  });

  // send user back

  let user = req.user;
  /*   delete user.password;
  console.log(user); */
  return res.send({ session, user });
};

// get the session handler
const getSessionHandler = (req, res) => {
  return res.send(req.activeUser);
};
// logout handler
const deleteSessionHandler = (req, res) => {
  res.cookie("accessToken", "", {
    maxAge: 0,
    httpOnly: true,
  });

  res.cookie("refreshToken", "", {
    maxAge: 0,
    httpOnly: true,
  });

  const session = invalidateSession(req.user.sessionId);

  return res.send(session);
};

exports.createSessionHandler = createSessionHandler;
exports.getSessionHandler = getSessionHandler;
exports.deleteSessionHandler = deleteSessionHandler;
