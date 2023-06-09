const User = require("../models/user");
//get all users
const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json(error);
  }
};
//get one user by id
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId })
      .populate("friends")
      .populate("thoughts")
      .select("-__v");
    if (!user) {
      res.status(404).json({ message: "No user found with that ID" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
//create new user
const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
};
//add a friend to user
const addUserFriend = async (req, res) => {
  try {
    const selectedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    if (!selectedUser) {
      res.status(404).json({
        message: "No User found. Please check to see if _id is correct.",
      });
    } else {
      res.status(200).json(selectedUser);
    }
  } catch (error) {}
};
//delete friend from user
const deleteUserFriend = async (req, res) => {
  try {
    const selectedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!selectedUser) {
      res.status(404).json({
        message: "No User found. Please check to see if _id is correct.",
      });
    } else {
      res.status(200).json(selectedUser);
    }
  } catch (error) {}
};
//update user info
const updateUser = async (req, res) => {
  try {
    const selectedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      req.body,
      { new: true }
    );
    if (!selectedUser) {
      res.status(404).json({
        message: "No User found. Please check to see if _id is correct.",
      });
    } else {
      res.status(200).json(selectedUser);
    }
  } catch (error) {}
};
//delete user by id
const deleteUser = async (req, res) => {
  try {
    const selectedUser = await User.findOneAndDelete({
      _id: req.params.userId,
    });
    if (!selectedUser) {
      res.status(404).json({
        message: "No User found. Please check to see if _id is correct.",
      });
    } else {
      res.status(200).json(selectedUser);
    }
  } catch (error) {}
};

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  addUserFriend,
  addUserFriend,
  updateUser,
  deleteUser,
  deleteUserFriend,
};
