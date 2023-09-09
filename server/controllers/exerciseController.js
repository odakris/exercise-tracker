// const exercise = require('../models/exercise');
const user = require("../models/user");

const isDate = (date) => {
  let dateRegex = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;

  if (dateRegex.test(date)) {
    return date;
  }
  console.log("Invalid Date");
  return "Invalid Date";
};

const isInt = (int) => {
  let intRegex = /\d+/;

  if (intRegex.test(int)) {
    return int;
  }
  console.log("Invalid Int");
  return "Invalid Int";
};

// CHECK IF AN _ID is PROVIDED
const noIdProvided = (req, res) => {
  res.status(400).json({ error: "Please provide an id" });
};

// ADD EXERCISE
const addExercise = async (req, res) => {
  let _id = req.params._id;
  let { description, duration, date } = req.body;
  
  let isUser = await user.findById(req.body[':_id']);
  
  if (!isUser) {
    res.status(400).json({ error: "Could not find any user related to this ID" });
  }

  if (!description || !duration) {
    res
      .status(400)
      .json({ error: "Please provide a description and duration" });
  } else {
    // Check for valid date format
    if (date) {
      isDate(date) === date
        ? date
        : res.json({ error: "Please provide valid date format (YYYY-MM-DD)" });
    }
    // Check for valid duration (integer only)
    isInt(duration) === duration
      ? duration
      : res.json({ error: "Please provide an integer as duration" });

    // Create new exercise
    let exerciseToAdd = {
      description: description,
      duration: parseInt(duration),
      date: date ? new Date(date).toDateString() : new Date().toDateString(),
    };

    // Update User
    let updatedUser = await user.findByIdAndUpdate(
      _id,
      { $push: { log: exerciseToAdd } },
      { new: true }
    );

    res.json({
      _id: updatedUser["_id"],
      username: updatedUser.username,
      date: exerciseToAdd.date,
      duration: exerciseToAdd.duration,
      description: exerciseToAdd.description,
    });
  }
};

// GET ALL EXERCISES FROM A USER
const getUserExercises = async (req, res) => {
  let { from, to, limit } = req.query;
  let _id = req.params._id
  let dateFrom;
  let dateTo;

  if (from) {
    isDate(from) === from
      ? from
      : res.json({
          error:
            "Please provide valid date format (YYYY-MM-DD) as 'from' query",
        });
    dateFrom = new Date(from);
  } else {
    dateFrom = new Date(0);
  }

  if (to) {
    isDate(to) === to
      ? to
      : res.json({
          error: "Please provide valid date format (YYYY-MM-DD) as 'to' query",
        });
    dateTo = new Date(to);
  } else {
    dateTo = new Date();
  }

  let userExercises = await user.findById(_id);
  let count = userExercises.log.length;

  let log = userExercises.log.filter((item) => {
    let currentExerciseDate = new Date(item.date).getTime();

    return (
      currentExerciseDate >= dateFrom.getTime() &&
      currentExerciseDate <= dateTo.getTime()
    );
  });

  if (limit) {
    isInt(limit) === limit
      ? limit
      : res.json({ error: "Please provide an integer as 'limit' query" });
    log = log.slice(0, limit);
  }

  res.json({
    _id: userExercises["_id"],
    username: userExercises.username,
    count: count,
    log: log,
  });
};

module.exports = { noIdProvided, addExercise, getUserExercises };
