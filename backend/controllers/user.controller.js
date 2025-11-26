import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import FriendRequest from "../models/friendRequest.model.js";
import { Convo } from "../models/convo.model.js";

export const InternalServerError = "Internal server error";

export const register = async (req, res)=>{
    try {
        const {username, email, password, name} = req.body;
        if (!username || !email || !password) {
            return  res.status(400).json({message: 'Please fill all required fields'});
        }
        const exists = await User.findOne({$or: [{email}, {username}]});
        if (exists) {
            return res.status(400).json({message: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            name
        });
        res.status(201).json({success:true, message: 'User created successfully'});
    } catch (err) {
        console.log(err)
        res.status(500).json({message: InternalServerError});
    }
}

export const login = async (req, res)=>{
    try {
        const {usernameoremail, password} = req.body;
        if (!usernameoremail || !password) {
            return res.status(400).json({message: 'Please fill all required fields'});
        }
        const user = await User.findOne({$or: [{email: usernameoremail}, {username: usernameoremail}]})
        if (!user) {
            return res.status(400).json({message: 'User not found'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }
        const userData = {
            id: user._id,
            username: user.username,
            email: user.email,
            name: user.name,
            profilePic: user.profilePic,
            dob: user.dob,
        };
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'});
        res.cookie('token', token, {
            httpOnly: true, 
            sameSite: 'none', 
            secure: true, 
            path: '/',
            maxAge: 30*24*60*60*1000
        }).status(200).json({success: true, message: 'Login successful'});
    } catch (err) {
        console.log(err)
        res.status(500).json({message: InternalServerError});
    }
}

export const logout = async (req, res)=>{
    try {
        res.clearCookie('token', {
            httpOnly: true, 
            sameSite: 'none', 
            secure: true,
            path: '/'
        });
        res.redirect(`${process.env.FRONTEND_URL}/login`);
    } 
    catch (err) {
        console.log(err)
        return res.status(500).json({success: false, message: InternalServerError});
    }
}

export const getProfile = async (req, res)=>{
    try {
        const username = req.params.username;
        const user = await User.findOne({username}).select('-password');
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        return res.status(200).json({success: true, user});
    } catch (err) {
        console.log(err)
        return res.status(500).json({success: false, message: InternalServerError});
    }
}   

export const getMe = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password').populate({path: 'servers', select: '_id name description defaultChannelId'});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ success: true, user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: InternalServerError });
    }
}

export const updateStatus = async (req, res) => {
    try {
        const userId = req.user.id;
        const { status } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.status = status;
        await user.save();
        res.status(200).json({ success: true, message: 'Status updated' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: InternalServerError });
    }
}
