import { Convo } from "../models/convo.model.js";
import { Message } from "../models/message.model.js";

export const getMessages = async (req, res) => {
    try {
        const convoId = req.params.convoId;
        const convo = await Convo.findById(convoId).populate({path: "messages", populate: {path: "sender", select: "name username avatar githubId githubUsername"}});
        if (!convo) {
            return res.status(404).json({ message: 'Conversation not found' });
        }
        res.status(200).json({ success: true, messages: convo.messages });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: InternalServerError });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const userId = req.user.id;
        const convoId = req.params.convoId;
        const { content } = req.body;
        const convo = await Convo.findById(convoId);
        const recipientId = convo.participants.find(participantId => participantId.toString() !== userId);
        if (!convo || !convo.participants.includes(userId)) {
            return res.status(404).json({ message: 'Conversation not found' });
        }
        const newMessage = await Message.create({
            sender: userId,
            origin: 'directMessage',
            convo: convoId,
            message: content
        });
        convo.messages.push(newMessage._id);
        await convo.save();
        const populatedMessage = await Message.findById(newMessage._id).populate({ path: 'sender', select: '-password' });
        res.status(201).json({ success: true, message: populatedMessage });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: InternalServerError });
    }
}


