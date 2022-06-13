const Post = require("../models/post.js");
const User = require("../models/User.js");
const Reply = require("../models/reply.js");
const router = require("express").Router();
const { requireUser } = require("../middleware/requireUser");
const { verifyJWT, signJWT } = require("../utils/jwt.utils");
const axios = require("axios");

const checkIfUserHasAuthorizedAcces = (loggedInEmail, email) =>
  loggedInEmail === email;

const deleteReply = async (reply) => {
  // Find the reply author and remove the reply from replies
  const user = await User.findById(reply.author);
  console.log(reply);
  user.replies = user.replies?.filter((r) => {
    console.log(r, reply._id.toString());
    return reply._id.toString() !== r;
  });

  // Delete the reply from Reply table
  await reply.delete();

  // Save everything
  await user.save();
};

const deletePost = async (post) => {
  await User.findByIdAndUpdate(
    post.author,
    { $pull: { posts: post._id } },
    { new: true }
  );

  await post.delete();
};

// Create new post
router.post("/create", requireUser, async (req, res) => {
  try {
    const user = await User.findById(req.body.author);
    if (!checkIfUserHasAuthorizedAcces(req.user.email, user.email))
      return res.status(403).json("Unauthorized action!");
    const newPost = new Post({
      content: req.body.content,
      author: user._id,
      image: req.body.image,
      publishedAt: req.body.publishedAt,
    });

    await newPost.save();
    await User.findByIdAndUpdate(
      { _id: user._id },
      { $addToSet: { posts: newPost._id } },
      { new: true }
    );

    const { avatar, firstName, lastName } = user;
    const response = {
      avatar,
      firstName,
      lastName,
      ...newPost._doc,
    };
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(post.author);

    if (!checkIfUserHasAuthorizedAcces(req.user.email, user.email))
      return res.status(403).json("Unauthorized action!");

    if (post.replies.length) {
      // Delete all replies from the post
      post.replies.forEach(async (reply) => {
        const r = await Reply.findById(reply);
        await deleteReply(r);
      });
    }
    await deletePost(post);
    res.status(200).json({ message: "Success!" });
  } catch (error) {
    console.log(error);
  }
});

// Get N posts from a user
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const posts = await Post.find({ author: req.params.id }) //  author: req.params.id
      .limit(req.query.count)
      .sort({ _id: -1 });
    const cleanedPosts = await Promise.all(
      posts.map(async (userPost) => {
        const post = await Post.findById(userPost._id);
        /* const { firstName, lastName, avatar, handle, fullName } =
          await User.findById(cleanedPost.author); */

        /* cleanedPost = {
          ...cleanedPost._doc,
          firstName,
          lastName,
          avatar,
          handle,
          fullName,
        }; */

        return { user, post };
      })
    );

    return res.status(200).json(cleanedPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Get posts from friends and user
router.get("/timeline/:id", async (req, res) => {
  try {
    let posts = [];
    const user = await User.findById(req.params.id);

    // Get all the user posts
    let response = await axios.get(
      "http://localhost:8080/api/post/user/" + user._id
    );

    posts = [...posts, ...response.data];

    // Get all friends
    const friends = await axios.get(
      "http://localhost:8080/api/user/friends/" + user._id
    );

    const friendsPosts = await Promise.all(
      friends.data.map(
        async (friend) =>
          await Promise.all(
            friend.posts.map(async (postId) => {
              const post = await Post.findById(postId);
              return {
                user: friend,
                post,
              };
            })
          )
      )
    );

    friendsPosts.forEach((friend) => {
      friend.forEach((post) => {
        posts.push(post);
      });
    });

    // Sort posts by time posted, time is reflected in the _id property

    posts = posts.sort((a, b) => (a.post._id < b.post._id ? 1 : -1));
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
// Create new reply
router.post("/reply", requireUser, async (req, res) => {
  try {
    const user = await User.findById(req.body.author);
    /* console.log(user?.email, req.body.author); */

    // Check if the user has the rights to this action
    if (!checkIfUserHasAuthorizedAcces(req.user.email, user.email))
      return res.status(403).json("Unauthorized action!");

    // Create the reply
    const newReply = new Reply({
      content: req.body.content,
      author: req.body.author,
      publishedAt: req.body.published,
      originalPost: req.body.originalPost,
    });

    const reply = await newReply.save();

    // Append the reply to original post

    const post = await Post.findById(req.body.originalPost);

    post.replies = [...post.replies, reply._id]; //?.push(reply.id);
    user.replies = [...user.replies, reply._id];

    const { firstName, lastName, avatar } = user;

    await user.save();
    await post.save();

    res.status(200).json({ firstName, lastName, avatar, ...newReply._doc });
  } catch (error) {
    console.log(error);
    res.status(500).json("Error");
  }
});

// Delete a reply
router.delete("/reply/:id", requireUser, async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);
    const user = await User.findById(reply.author);

    // Check if the user has the authorization for this action
    if (!checkIfUserHasAuthorizedAcces(req.user.email, user.email))
      return res.status(403).json("Unauthorized action!");

    const post = await Post.findById(reply.originalPost);
    post.replies = post.replies?.filter((reply) => reply !== req.params.id);

    await deleteReply(reply);
    await post.save();

    res.status(200).json("OK");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Get all replies to a post
router.get("/replies/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const replies = await Promise.all(
      post.replies?.map(async (reply) => {
        let cleanedReply = await Reply.findById(reply);
        const user = await User.findById(cleanedReply.author);
        const { firstName, lastName, avatar, handle } = user;

        cleanedReply = cleanedReply._doc;
        return {
          firstName,
          lastName,
          avatar,
          handle,
          ...cleanedReply,
        };
      })
    );

    return res.status(200).json(replies);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

// Vote on a post
router.put("/vote/:id", requireUser, async (req, res) => {
  try {
    //console.log(req.body);
    const user = await User.findById(req.body.activeUser);
    if (!checkIfUserHasAuthorizedAcces(req.user.email, user.email))
      return res.status(403).json("Unauthorized action!");

    const post = await Post.findById(req.params.id);
    if (req.body.vote === "LIKE") {
      // If the post is already liked by the user
      if (post.likedBy.includes(user._id)) {
        post.likes -= 1;
        post.likedBy = post.likedBy.filter((id) => id !== user._id.toString());
      }

      // If the post is already disliked by the user
      else if (post.dislikedBy.includes(user._id)) {
        post.dislikes -= 1;
        post.likes += 1;
        post.dislikedBy = post.dislikedBy.filter(
          (id) => id !== user._id.toString()
        );
        post.likedBy.push(user._id);
      }

      // If the user did not vote on the post before
      else {
        post.likes += 1;
        post.likedBy.push(user._id);
      }
    } else if (req.body.vote === "DISLIKE") {
      // If the post is already disliked by the user
      if (post.dislikedBy.includes(user._id)) {
        post.dislikes -= 1;
        post.dislikedBy = post.likedBy.filter(
          (id) => id !== user._id.toString()
        );
      }

      // If the post is already liked by the user
      else if (post.likedBy.includes(user._id)) {
        post.likes -= 1;
        post.dislikes += 1;
        post.likedBy = post.likedBy.filter((id) => id !== user._id.toString());
        post.dislikedBy.push(user._id);
      }

      // If the user did not vote on the post before
      else {
        post.dislikes += 1;
        post.dislikedBy.push(user._id);
      }
    }

    const newPost = await post.save();
    const { likes, dislikes, likedBy, dislikedBy } = newPost;
    return res.status(200).json({
      likes,
      dislikes,
      likedBy,
      dislikedBy,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
  //
});
module.exports = router;
