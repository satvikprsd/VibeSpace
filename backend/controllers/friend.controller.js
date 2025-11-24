import FriendRequest from "../models/friendRequest.model.js";
import { User } from "../models/user.model.js";
import { InternalServerError } from "./user.controller.js";

export const sendFriendRequest = async (req, res) => {
    try {
        const userId = req.user.id;
        const friendUsername = req.params.username;
        const user = await User.findById(userId);
        const friend = await User.findOne({ username: friendUsername });
        if (!user || !friend) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.friends.includes(friend._id)) {
            return res.status(400).json({ message: 'Already friends' });
        }
        const existingRequest = await FriendRequest.findOne({ from: userId, to: friend._id, status: 'pending' });
        if (existingRequest) {
            return res.status(400).json({ message: 'Friend request already sent' });
        }
        const friendRequest = await FriendRequest.create({
            from: userId,
            to: friend._id,
            status: 'pending'
        });
        res.status(200).json({ success: true, message: 'Friend request sent', friendRequest });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: InternalServerError });
    }
}

export const handleFriendRequest = async (req, res) => {
    try {
        const userId = req.user.id;
        const { requestId } = req.params;
        const { action } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const friendRequest = await FriendRequest.findById(requestId);
        if (!friendRequest || friendRequest.to.toString() !== userId) {
            return res.status(404).json({ message: 'Friend request not found' });
        }
        const friend = await User.findById(friendRequest.from);
        if (!friend) {
            return res.status(404).json({ message: 'friend not found' });
        }
        if (action === 'accept') {
            friendRequest.status = 'accepted';
            user.friends.push(friendRequest.from);
            friend.friends.push(userId);
            await friend.save();
            await friendRequest.save();
            await user.save();
        }
        else if (action === 'reject') {
            friendRequest.status = 'rejected';
            await friendRequest.save();
        }
        else {
            return res.status(400).json({ message: 'Invalid action' });
        }
        res.status(200).json({ success: true, message: `Friend request ${action}ed` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: InternalServerError });
    }
}

export const getPendingFriendRequests = async (req, res) => {
    try {
        const userId = req.user.id;
        const requests = await FriendRequest.find({$or: [{to: userId, status: 'pending'}, {from: userId, status: 'pending'}]}) .populate([{path: "from",select: "-password -friends -servers"},{path: "to",select: "-password -friends -servers"}]);
        res.status(200).json({ success: true, requests });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: InternalServerError });
    }
}

export const getFriends = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate({path: 'friends', select: '-password -friends -servers'});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ success: true, friends: user.friends });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: InternalServerError });
    }
}