import mongoose from "mongoose";

const inviteSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    server: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Server',
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 7*24*60*60*1000) 
    }
}, {timestamps: true});

inviteSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Invite = mongoose.model('Invite', inviteSchema);