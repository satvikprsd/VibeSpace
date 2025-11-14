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
    githubUsername: {
        type: String,
    },
    githubAccessToken: {
        type: String,
        select: false,
    },
    githubRefreshToken: {
        type: String,
        select: false,
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
        enum: ['Online', 'Offline', 'Dnd', 'Idle', 'Invisible'],
        default: 'Offline'
    },
    activity: {
        type: String,
        default: ''
    },
    friends : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    servers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Server'
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