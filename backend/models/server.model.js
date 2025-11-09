import mongoose from "mongoose";

const serverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    githubRepoId: {
        type: String,
        unique: true,
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description : {
        type: String,
        default: ''
    },
    // channels: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Channel'  
    // }],
    members : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});