//import jwt, { decode } from "jsonwebtoken";
const jwt = require("jsonwebtoken");

// EXAMPLE KEYS - NOT USED FOR SECURING ANY SENSITIVE INFORMATION
const privateKey = `
-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQDFaHfG49SeYE84B6Irb0v028ZKLcst4di255F+Rcj6xl2pSIo8
2rzLt24xleU+8tYf2vEm6AOXP/H5YsQ+BSwwvcOvkqSi68zepoOMmt6ufGOToTXo
mDKYgBufsOKLHTudlzJ/C0V4DzpmF8pPof0lhpJTBdrYwHqYnKuqInYj2wIDAQAB
AoGAE6zp40Tp+C8ZNjhsjW+2Xl1ZUiNmUNhlxTUnZzKFaZlD1I+KV65lithpfz+1
baS+esZTqtENKpIRCA40CQpy8Oue9NGuZdMyvzUAL+VhPyznV/h2SCWR99jsGOSd
Vhq+45MO5nK4uSk6YUaq2hyCkVKTuXJPYLXNbXLslJfdZ8ECQQD72J0B+phDsLBa
gzkL9RFjvUNZ9jxRoAyKJvedcEMoHk+JswTm9TzTHyGQia17nyYGTkq9Qf4sa/JI
zfi3ZcEzAkEAyKn/Qf9/sueR2oaj6wvsfiLAh+ez9onedqnOxPnHF5Bv/qo3I4/i
HWXyf5DeD0u9xVvcJwRHA7+DCpOPsihiuQJAFOih+GUWuR/1ND6KwOxiujYfXlus
HFa+U8XybtbALJd/oP4E3SvlFd4Syk4z4fyPipx7ZgURlhyMK/E1wfwnswJBAK9v
OLSpvSpbnL/R8OOhZByPI4ZuQ39q3+0c3qKFwdNPOysKA/T6aXTMWau/qvTygjJW
8m3GJpQXTmjjw8C94DkCQCI+T9GSOZBb2y1QHUAuCIn37WVYC3CP3/ZAKruxJAKO
/C1UemSIjt9Bv4gyolyswa0KIAyfcHe57N997VHe0VU=
-----END RSA PRIVATE KEY-----`;

const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDFaHfG49SeYE84B6Irb0v028ZK
Lcst4di255F+Rcj6xl2pSIo82rzLt24xleU+8tYf2vEm6AOXP/H5YsQ+BSwwvcOv
kqSi68zepoOMmt6ufGOToTXomDKYgBufsOKLHTudlzJ/C0V4DzpmF8pPof0lhpJT
BdrYwHqYnKuqInYj2wIDAQAB
-----END PUBLIC KEY-----`;

// sign jwt

function signJWT(payload, expiresIn) {
  return jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn,
  });
}

// verify jwt

function verifyJWT(token) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return { payload: decoded, expired: false };
  } catch (error) {
    console.log(error.message);
    return {
      payload: null,
      expired: error.message.includes("jwt expired"),
    };
  }
}

exports.verifyJWT = verifyJWT;
exports.signJWT = signJWT;
exports.publicKey = publicKey;
