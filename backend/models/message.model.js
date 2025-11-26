import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    origin: {
        type: String,
        enum: ['textChannel', 'directMessage'],
    },
    convo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Convo',
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel',
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

messageSchema.pre('validate', function(next) {
    if (!this.convo && !this.channel) {
        next(new Error('convo or channelis required'));
    } else {
        next();
    }
});

export const Message = mongoose.model('Message', messageSchema);