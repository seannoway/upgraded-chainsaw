const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
        },
        createdAt:{
            type: Date,
            default: Date.now(),
            get: (milly) => {
                return new Date(milly).toLocaleTimeString()
            },

        }
        }

    }