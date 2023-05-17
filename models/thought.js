const { Schema, model } = require('mongoose');
const Reaction = require('./reaction.js');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (milly) => {
                return new Date(milly).toLocaleTimeString()
            },
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
           Reaction
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// retrieves the total amount of reactions
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
}
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;


     