const router = require("express").Router();
const axios = require("axios");
const User = require("../models/User");
const Group = require("../models/Group");

const createNewGroup = async (payload) => {
  try {
    const group = new Group({
      name: payload.name,
      public: payload.public,
    });

    await group.save();
    return group;
  } catch (error) {
    console.log(error.message);
  }
};

router.post("/create", async (req, res) => {
  try {
    console.log("called");
    const group = await createNewGroup(req.body);
    console.log(group);
    return res.status(200).json(group);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
});

module.exports = router;
