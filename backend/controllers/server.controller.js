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

        res.status(201).json({ success: true, server: newServer });
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

export const joinServer = async (req, res) => {
    try {
        const { serverId } = req.params;
        const userId = req.user.id;
        
        const server = await Server.findById(serverId);
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