import { stat } from "fs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    githubId: {
        type: String,
        unique: true,
        default: null
    },
    githubProfileUrl: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'default.jpg'
    },
    status: {
        type: String,
        enum: ['online', 'offline', 'dnd', 'idle', 'invisible'],
        default: 'offline'
    },
    activity: {
        type: String,
        default: ''
    },
    friends : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    dob: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const User = mongoose.model('User', userSchema);