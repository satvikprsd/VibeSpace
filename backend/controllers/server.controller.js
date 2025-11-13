import { Invite } from "../models/invite.model.js";
import { Server } from "../models/server.model.js";

export const createServer = async (req, res) => {
    try {
        const { name, description } = req.body;
        const ownerId = req.user.id;
        
        if (!name || !ownerId) {
            return res.status(400).json({ message: 'Name and Owner ID are required' });
        }

        const newServer = await Server.create({
            name,
            description,
            owner: ownerId,
            members: [ownerId]
        });

        res.status(201).json({ success: true, server: newServer, message: 'Server created successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getServerById = async (req, res) => {
    try {
        const { serverId } = req.params;
        
        const server = await Server.findById(serverId).populate({ path: 'owner', select: '-password' }).populate({ path: 'members', select: '-password' });
        if (!server) {
            return res.status(404).json({ message: 'Server not found' });
        }
        
        res.status(200).json({ success: true, server });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const generateInvite = async (req, res) => {
    try {
        const { serverId } = req.params;
        const { expiresAt } = req.body;
        const server = await Server.findById(serverId);
        if (!server) {
            return res.status(404).json({ message: 'Server not found' });
        }
        const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        const invite = await Invite.create({
            code: inviteCode,
            server: server._id,
            createdBy: req.user.id,
            expiresAt: expiresAt ? new Date(expiresAt) :new Date(Date.now() + 60*1000)
        });
        res.status(200).json({ success: true, inviteCode, expiresAt: invite.expiresAt });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const joinServer = async (req, res) => {
    try {
        const { inviteCode } = req.params;
        const userId = req.user.id;
        
        const invite = await Invite.findOne({ code: inviteCode }).populate('server');
        if (!invite) {
            return res.status(404).json({ message: 'Invalid or Expired invite code' });
        }
        const server = invite.server;
        if (!server) {
            return res.status(404).json({ message: 'Server not found' });
        }
        
        if (server.members.includes(userId)) {
            return res.status(400).json({ message: 'User already a member of the server' });
        }
        
        server.members.push(userId);
        await server.save();
        
        res.status(200).json({ success: true, message: 'Joined server successfully', server });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const leaveServer = async (req, res) => {
    try {
        const { serverId } = req.params;
        const userId = req.user.id;
        
        const server = await Server.findById(serverId);
        if (!server) {
            return res.status(404).json({ message: 'Server not found' });
        }
        
        if (!server.members.includes(userId)) {
            return res.status(400).json({ message: 'User is not a member of the server' });
        }
        
        server.members = server.members.filter((memberId) => memberId.toString()!==userId);
        await server.save();
        
        res.status(200).json({ success: true, message: 'Left server successfully', server });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getUserServers = async (req, res) => {
    try {
        const userId = req.user.id;
        const servers = await Server.find({ members: userId }).populate({ path: 'owner', select: '-password' }).populate({ path: 'members', select: '-password' });
        res.status(200).json({ success: true, servers });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
