const User = require("../models/User");
const router = require("express").Router();
const { requireUser } = require("../middleware/requireUser");
const { remove } = require("../models/User");
const Movie = require("../models/movie");

const checkIfUserHasAuthorizedAcces = (loggedInEmail, email) =>
  loggedInEmail === email;

const getAllMoviesFromUser = async (user) => {
  try {
    const movies = await Promise.all(
      await user.movies.map(async (movie) => await Movie.findById(movie))
    );
    return movies;
  } catch (error) {
    console.log(error.message);
  }
};

/* const getAllFollowedMoviesFromUser = async(user) => {
  try {
    const movies = await Promise.all(
      await user.movies.map(async (movie) => await Movie.findById(movie))
    );
  } catch (error) {
    
  }console.log(error.message);
} */

// Get a single user
router.get("/single/:handle", async (req, res) => {
  try {
    const user = await User.find({ handle: req.params.handle }).collation({
      locale: "en",
      strength: 2,
    });
    const { password, ...other } = user;

    res.status(200).json(other["0"]);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get a list of users from user input
router.get("/search", async (req, res) => {
  try {
    const substr = req.query.substr;

    const users = await User.find({ fullName: { $regex: substr } }).collation({
      locale: "en",
      strength: 2,
    });

    console.log(users.length);
    const cleanOutput = users.map((user) => {
      return {
        fullName: user.fullName,
        avatar: user.avatar,
        _id: user._id,
        bio: user.bio,
        handle: user.handle,
        banner: user.banner,
      };
    });

    res.status(200).json(cleanOutput);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get a list of users within an array of users
router.get("/users", async (req, res) => {
  try {
    console.log(req.query);
    const users = await Promise.all(
      req.query.users.map(async (userId) => {
        const user = await User.findById(userId);
        const { firstName, lastName, avatar, handle, _id, fullName, banner } =
          user;

        return {
          firstName,
          lastName,
          avatar,
          _id,
          handle,
          fullName,
          banner,
        };
      })
    );

    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Get N recent users
router.get("/recent", async (req, res) => {
  //console.log(req.query.count);
  try {
    const users = await User.find({})
      .limit(req.query.count)
      .limit(3)
      .sort({ _id: -1 });
    /* onsole.log(users); */
    const payload = users.map((user) => {
      const { firstName, lastName, avatar, _id, handle } = user;
      return {
        firstName,
        lastName,
        avatar,
        handle,
        _id,
      };
    });

    //console.log(payload);
    res.status(200).json(payload);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Send friend request
router.put("/addfriend", requireUser, async (req, res) => {
  try {
    console.log(req.body);
    // Get both users involved in the request
    const receiver = await User.findById(req.body.receiverId);
    const sender = await User.findById(req.body.senderId);

    if (!checkIfUserHasAuthorizedAcces(req.user.email, sender.email))
      return res.status(403).json("Unauthorized action!");

    if (receiver._id.toString() === sender._id.toString())
      return res.status(403).json("Cant add self");

    // Check if the user already sent the request before
    const exists = receiver.incomingRequests.find(
      (req) => req === sender._id.toString()
    );

    if (exists) return res.status(301).json("Invite already pending");

    // Check if the receiver already sent a request to the sender
    const addedBefore = receiver.outgoingRequests.find(
      (req) => req === sender._id.toString()
    );

    // If true accept the request and delete the requests from both users
    if (addedBefore) {
      receiver.outgoingRequests = receiver.outgoingRequests.filter(
        (req) => req !== sender._id.toString()
      );
      sender.incomingRequests = sender.incomingRequests.filter(
        (req) => req !== receiver._id.toString()
      );

      receiver.friends.push(sender._id);
      sender.friends.push(receiver._id);

      await receiver.save();
      await sender.save();

      return res.status(200).json(sender);
    }

    // If neither user sent a request before
    if (!addedBefore && !exists) {
      receiver.incomingRequests.push(sender._id);
      sender.outgoingRequests.push(receiver._id);

      await receiver.save();
      await sender.save();

      res.status(200).json(sender);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Accept , denie or cancel friend request
router.put("/managerequests", requireUser, async (req, res) => {
  try {
    // Get both users involved in the request
    const receiver = await User.findById(req.body.receiverId);
    const sender = await User.findById(req.body.senderId);

    console.log("receiver: ", receiver.handle, "sender: ", sender.handle);
    if (!checkIfUserHasAuthorizedAcces(req.user.email, sender.email))
      return res.status(403).json("Unauthorized action!");

    receiver.incomingRequests = receiver.incomingRequests.filter(
      (req) => req !== sender._id.toString()
    );

    sender.incomingRequests = sender.incomingRequests.filter(
      (req) => req !== receiver._id.toString()
    );

    receiver.outgoingRequests = receiver.outgoingRequests.filter(
      (req) => req !== sender._id.toString()
    );

    sender.outgoingRequests = sender.outgoingRequests.filter(
      (req) => req !== receiver._id.toString()
    );

    if (req.body?.decision === "ACCEPT") {
      receiver.friends.push(sender._id);
      sender.friends.push(receiver._id);
    }

    await receiver.save();
    await sender.save();
    return res.status(200).json(sender);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Remove friend
router.delete("/removefriend", requireUser, async (req, res) => {
  try {
    // Get both users involved in the request
    const remover = await User.findById(req.query.removerId);
    const removed = await User.findById(req.query.removedId);

    if (!checkIfUserHasAuthorizedAcces(req.user.email, remover.email))
      return res.status(403).json("Unauthorized action!");

    remover.friends = remover.friends.filter(
      (friend) => friend !== removed._id.toString()
    );

    removed.friends = removed.friends.filter(
      (friend) => friend !== remover._id.toString()
    );

    await remover.save();
    await removed.save();

    return res.status(200).json(remover);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Get user friends
router.get("/friends/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const friends = await Promise.all(
      user.friends.map(async (f) => {
        const friend = await User.findById(f);
        return friend;
      })
    );

    res.status(200).json(friends);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Get requests
router.get("/requests/:id", requireUser, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const outgoing = await Promise.all(
      user.outgoingRequests.map(async (req) => {
        return await User.findById(req);
      })
    );

    const incoming = await Promise.all(
      user.incomingRequests.map(async (req) => {
        return await User.findById(req);
      })
    );

    return res.status(200).json({ outgoing, incoming });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
});

// Add a movie to movie collection
router.put("/addmovie", requireUser, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!checkIfUserHasAuthorizedAcces(req.user.email, user.email))
      return res.status(403).json("Unauthorized action!");

    const movies = await getAllMoviesFromUser(user);
    const ratedBefore = movies?.find((movie) => +movie.id === req.body.movieId);

    if (ratedBefore) {
      await Movie.findByIdAndUpdate(ratedBefore._id, {
        $set: { rating: req.body.rating },
      });
    } else {
      const newMovie = new Movie({
        id: req.body.movieId,
        rating: req.body.rating,
        userId: req.body.userId,
      });
      await newMovie.save();
      user.movies = [...user.movies, newMovie._id];
      await user.save();
    }

    await res.status(200).json("OK");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Get movies the user follows
router.get("/followedmovies/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user.moviesFollowed);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
});

// Add a movie to user followed list
router.put("/followmovie/:id", requireUser, async (req, res) => {
  try {
    const user = await User.findById(req.body.user);
    if (!checkIfUserHasAuthorizedAcces(req.user.email, user.email))
      return res.status(403).json("Unauthorized action!");

    /* const movies = await getAllFollowedMoviesFromUser(user); */
    const isFollowed = user.moviesFollowed?.find(
      (movie) => movie === req.params.id
    );
    if (!isFollowed) {
      user.moviesFollowed = [...user.moviesFollowed, req.params.id];
      await user.save();
      return res.status(200).json("OK");
    }
    return res.status(200).json("ALREADY FOLLOWING");
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
});

// Remove movie from movie collection
router.delete("/removemovie/:id", requireUser, async (req, res) => {
  try {
    const user = await User.findById(req.query.user);
    if (!checkIfUserHasAuthorizedAcces(req.user.email, user.email))
      return res.status(403).json("Unauthorized action!");

    // FIND AND DELETE THE MOVIE FROM DB
    const movie = await Movie.findOne({
      id: req.params.id,
      userId: req.query.user,
    });
    console.log(user.movies.length);
    user.movies = user.movies.filter(
      (m) => m.toString() !== movie._id.toString()
    );
    console.log(user.movies.length);
    await user.save();
    await movie.delete();
    return res.status(200).json("OK");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Check if a user has a specific movie in his collection
router.get("/watched/:id", requireUser, async (req, res) => {
  try {
    const user = await User.findById(req.query.user);
    const movies = await getAllMoviesFromUser(user);
    const isCollected = movies.find((movie) => movie.id === req.params.id);
    return res.status(200).json(isCollected ? true : false);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
});

// Edit general user information
router.put("/:id", requireUser, async (req, res) => {
  try {
    const { newBanner, newAvatar, ...other } = req.body;

    //Check if handle is taken
    /* const taken = await User.findOne({ handle: req.body.handle }); */
    const s = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...other,
          avatar: newAvatar || this.avatar,
          banner: newBanner || this.banner,
        },
      },
      { new: true }
    );
    return res.status(200).json(s);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
