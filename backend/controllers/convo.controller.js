import { Convo } from "../models/convo.model.js";
import { User } from "../models/user.model.js";
import { InternalServerError } from "./user.controller.js";

export const createOrGetConvo = async (req, res) => {
    try {
        const userId = req.user.id;
        const { participantId } = req.body;
        if (userId === participantId) {
            return res.status(400).json({ message: 'Cannot create conversation with yourself' });
        }
        const user = await User.findById(userId);
        const participant = await User.findById(participantId);
        if (!user || !participant) {
            return res.status(404).json({ message: 'User not found' });
        }
        const existingConvo = await Convo.findOne({participants: { $all: [userId, participantId] }}).populate({ path: 'participants', select: '-password' }).select('-messages');
        if (existingConvo) {
            return res.status(200).json({ success: true, convo: existingConvo });
        }
        const newConvo = await Convo.create({
            participants: [userId, participantId],
            messages: []
        });
        const populatedConvo = await Convo.findById(newConvo._id).populate({ path: 'participants', select: '-password' }).select('-messages');
        res.status(201).json({ success: true, convo: populatedConvo });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: InternalServerError});
    }
}

export const getUserConvos = async (req, res) => {
    try {
        const userId = req.user.id;
        const convos = await Convo.find({ participants: userId }).populate({ path: 'participants', select: '-password' }).select('-messages');
        res.status(200).json({ success: true, convos });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: InternalServerError });
    }
}

export const getConvoById = async (req, res) => {
    try {
        const userId = req.user.id;
        const { convoId } = req.params;
        const convo = await Convo.findById(convoId).populate({ path: 'participants', select: '-password' }).populate({ path: 'messages.sender', select: '-password' });
        if (!convo || !convo.participants.some(participant => participant._id.toString() === userId)) {
            return res.status(404).json({ message: 'Conversation not found' });
        }
        res.status(200).json({ success: true, convo });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: InternalServerError });
    }
}

