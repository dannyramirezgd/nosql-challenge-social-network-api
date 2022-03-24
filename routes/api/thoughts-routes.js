const router = require("express").Router();

const {
    addThought
} = require('../../controllers/thoughts-controller')

router.route('/').get()

router.route('/:id').get().put().delete()

router
    .route('/:userId')
    .post(addThought)

router
    .route('/:thoughtId/reactions')
    .post()
    .delete()
module.exports = router;
