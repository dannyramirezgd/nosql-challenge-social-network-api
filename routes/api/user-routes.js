const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriendsToUser,
  deleteFriendFromUser,
} = require("../../controllers/user-controller");

router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

router
    .route('/:userId/friends/:friendId')
    .put(addFriendsToUser)
    .put(deleteFriendFromUser)

module.exports = router;
