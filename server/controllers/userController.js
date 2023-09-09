const user = require("../models/user");

//  CREATE NEW USER
const addUser = async (req, res) => {
  if (!req.body.username) {
    res.status(400).json({ error: "Please Provide a username" });
  } else {
    try {
      let userName = await user.findOne({ username: req.body.username });

      if (!userName) {
        userName = await user.create({ username: req.body.username });

        res.json({
          username: userName.username,
          _id: userName["_id"],
        });
      } else {
        res.status(400).json({ error: "Username already taken" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
};

// GET USER ID
const getUserId = async (req, res) => {
  if (!req.body.getuserid) {
    res.status(400).json({ error: "Please Provide a username" });
  } else {
    try {
      let id = await user.findOne({ username: req.body.getuserid });

      if (!id) {
        res.status(400).json({ error: "Could not find this username" });
      } else {
        res.json({
          _id: id["_id"],
          username: id.username,
        });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
};

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    let allUsers = await user.find({});

    let responseObj = allUsers.map((item) => {
      return { _id: item["_id"], username: item.username };
    });

    res.send(responseObj);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { addUser, getUserId, getAllUsers };
