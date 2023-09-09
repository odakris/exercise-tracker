const express = require("express");
const router = express.Router();

// controllers
const {
  addUser,
  getUserId,
  getAllUsers,
} = require("../controllers/userController");
const {
  addExercise,
  noIdProvided,
  getUserExercises,
} = require("../controllers/exerciseController");

router.route("/api/users").get(getAllUsers).post(addUser);

router.route("/api/users/getuserid").post(getUserId);

router.route("/api/users/exercises").get(noIdProvided);

router.route("/api/users/:_id/exercises").post(addExercise);

router.route("/api/users/:_id/logs").get(getUserExercises);

module.exports = router;
