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
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
    if (!this.receiver && !this.channel) {
        next(new Error('receiver or channelis required'));
    } else {
        next();
    }
});

export const Message = mongoose.model('Message', messageSchema);