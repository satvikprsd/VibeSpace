import { Message } from "../models/message.model.js";
import { Server } from "../models/server.model.js";
import { textChannel } from "../models/textChannel.model.js";

export const deleteTextChannel = async (req, res) => {
    try {
        const { channelId } = req.params;
        const userId = req.user.id;
        const channel = await textChannel.findById(channelId);
        if (!channel) {
            return res.status(404).json({ message: 'Text channel not found' });
        }
        const server = await Server.findById(channel.server);
        if (!server) {
            return res.status(404).json({ message: 'Server not found' });
        }
        if (server.owner.toString() !== userId) {
            return res.status(403).json({ message: 'Only the server owner can delete text channels' });
        }
        await textChannel.findByIdAndDelete(channelId);
        server.textChannels = server.textChannels.filter((chId) =>chId.toString()!==channelId);
        await server.save();
        
        res.status(200).json({ success: true, message: 'Text channel deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const sendMessageToChannel = async (req, res) => {
    try {
        const { channelId } = req.params;
        const { content } = req.body;
        const userId = req.user.id;
        const channel = await textChannel.findById(channelId);
        if (!channel) {
            return res.status(404).json({ message: 'Text channel not found' });
        }
        const server = await Server.findById(channel.server);
        if (!server) {
            return res.status(404).json({ message: 'Server not found' });
        }
        if (!server.members.includes(userId)) {
            return res.status(403).json({ message: 'User is not a member of the server' });
        }
        const message =  await Message.create({
            sender: userId,
            origin: 'textChannel',
            channel: channel._id,
            message: content
        });
        channel.messages.push(message._id);
        await channel.save();
        res.status(201).json({ success: true, message: 'Message sent successfully', messageData: message });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getChannelMessages = async (req, res) => {
    try {
        const { channelId } = req.params;
        const userId = req.user.id;
        const channel = await textChannel.findById(channelId).populate({ path: 'messages', populate: { path: 'sender', select: 'username githubUsername name avatar status activity' }});
        if (!channel) {
            return res.status(404).json({ message: 'Text channel not found' });
        }
        const server = await Server.findById(channel.server);
        if (!server) {
            return res.status(404).json({ message: 'Server not found' });
        }
        if (!server.members.includes(userId)) {
            return res.status(403).json({ message: 'User is not a member of the server' });
        }
        res.status(200).json({ success: true, messages: channel.messages });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}