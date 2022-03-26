const router = require("express").Router();

const {
  addThought,
  getAllThoughts,
  getThoughtsById,
  updateThoughtsById,
  deleteThoughtsById,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughts-controller");

router.route("/").get(getAllThoughts);

router
  .route("/:id")
  .get(getThoughtsById)
  .put(updateThoughtsById)
  .delete(deleteThoughtsById);

router.route("/:userId").post(addThought);

router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
