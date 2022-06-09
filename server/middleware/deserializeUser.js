const { getSession, createSession } = require("../utils/sessions");
const { verifyJWT, signJWT } = require("../utils/jwt.utils");
const jwt = require("jsonwebtoken");
const deserializeUser = (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;
  /*  console.log("accessToken: ", accessToken);
  console.log("refreshToken: ", refreshToken); */
  if (!accessToken) {
    return next();
  }

  const { payload, expired } = verifyJWT(accessToken);
  /* console.log(payload, expired); */
  // For a valid access token
  if (payload) {
    req.user = payload;
    return next();
  }

  // For expired but valid access token
  const { payload: refresh } =
    expired && refreshToken ? verifyJWT(refreshToken) : { payload: null };

  if (!refresh) {
    return next();
  }

  console.log("refresh: ", refresh);

  let session = getSession(refresh.sessionId);

  if (!session && !expired)
    return res.status(400).send({ error: "No active session" });

  if (!session && expired) {
    const s = jwt.decode(accessToken);
    session = createSession(s.email, s.name);
  }
  console.log("Generating new access token");
  const newAccessToken = signJWT(session, "10m");
  res.cookie("accessToken", newAccessToken, {
    maxAge: 8.64e7, // 1 day
    httpOnly: true,
  });

  req.user = verifyJWT(newAccessToken).payload;
  return next();
};

module.exports = deserializeUser;
