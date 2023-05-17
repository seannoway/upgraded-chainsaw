const { Schema, model, Types } = require('mongoose');

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
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction',
            },
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

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (milly) => {
                return new Date(milly).toLocaleTimeString()
            },
        },
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
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
const Reaction = model('Reaction', ReactionSchema);

module.exports = Thought;
module.exports = Reaction;

     