const { User } = require("../models");

const userController = {
  async getAllUsers(req, res) {
    try {
      const dbUserData = await User.find({})
        .populate({
          path: "friends",
          select: "-__v",
        })
        .select("-__v");
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async getUserById({ params }, res) {
    try {
      const dbUserData = await User.findOne({ _id: params.id })
        .populate({
          path: "friends",
          select: "-__v",
        })
        .select("-__v");
      if (!dbUserData) {
        res.status(404).json({ message: "No user found at this id" });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async createUser({ body }, res) {
    try {
      const dbUserData = await User.create(body);
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  async updateUser({ params, body }, res) {
    try {
      const dbUserData = await User.findOneAndUpdate({ _id: params.id }, body, {
        new: true,
        runValidators: true,
      });
      if (!dbUserData) {
        res.status(404).json({ message: "No user found at this id!" });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteUser({ params }, res) {
    try{
        const dbUserData = await User.findOneAndDelete({ _id: params.id })
        if (!dbUserData) {
            res.status(404).json({ message: "No user found at this id!" });
            return;
        }
        res.json(dbUserData);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
      }
  }
};

module.exports = userController;