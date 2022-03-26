const { User, Thoughts } = require("../models");

//delete a reaction to thought reactions array

const thoughtController = {
  async getAllThoughts(req, res) {
    try {
      const dbThoughtData = await Thoughts.find({}).select("-__v");

      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async getThoughtsById({ params }, res) {
    try {
      const dbThoughtData = await Thoughts.findOne({ _id: params.id }).select(
        "-__v"
      );

      if (!dbThoughtData) {
        res.status(404).json({ message: "No thought found with this id " });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

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

  async updateThoughtsById({ params, body }, res) {
    try {
      const dbThoughtData = await Thoughts.findOneAndUpdate(
        { _id: params.id },
        body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!dbThoughtData) {
        res.status(404).json({ message: "no thought found at this id" });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteThoughtsById({ params }, res) {
    try {
      const dbThoughtData = await Thoughts.findOneAndDelete({ _id: params.id });
      if (!dbThoughtData) {
        res.status(404).json({ message: "no thought found at this id" });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  async addReaction({ params, body }, res) {
    try {
      const dbReactionData = await Thoughts.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true }
      );
      if (!dbReactionData) {
        res.status(404).json({ message: "no thought found with this id" });
        return;
      }
      res.json(dbReactionData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteReaction({ params }, res) {
    try {
      const dbReactionData = await Thoughts.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
      );
      console.log(dbReactionData)
      if (!dbReactionData) {
        res.status(404).json({ message: 'no thought found with this id' })
        return;
      }
      res.json(dbReactionData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
};

module.exports = thoughtController;
