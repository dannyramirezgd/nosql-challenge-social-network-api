const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction')
const moment = require('moment')

const ThoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => moment(timestamp).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
},
{
    toJSON:{
        virtuals: true,
        getters: true
    },
    id: false
})

ThoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;