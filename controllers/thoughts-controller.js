const { User, Thoughts } = require("../models");

const thoughtController = {
  async addThought({ params, body }, res) {
    try {
      const dbThoughtData = await Thoughts.create(body);
      const dbUserData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { thoughts: dbThoughtData._id } },
        { new: true, runValidators: true }
      );
      console.log(dbUserData);
      if (!dbUserData) {
        res.status(404).json({ message: "No pizza found with this id!" });
        return;
      }
      return res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
