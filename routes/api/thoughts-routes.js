const router = require("express").Router();

const {
    addThought
} = require('../../controllers/thoughts-controller')

router
    .route('/:userId')
    .post(addThought)

module.exports = router;
