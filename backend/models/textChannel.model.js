import mongoose from "mongoose";

const textChannelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    server: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Server',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
});

export const textChannel= mongoose.model('TextChannel', textChannelSchema);