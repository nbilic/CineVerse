const requireUser = (req, res, next) => {
  /* console.log(req.user); */
  if (!req.user) {
    return res.status(500).json("Invalid sesion");
  }

  return next();
};

exports.requireUser = requireUser;
