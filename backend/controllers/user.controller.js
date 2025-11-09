import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
        res.status(500).json({message: 'Server error'});
    }
}

export const login = async (req, res)=>{
    try {
        const {usernameoremail, password} = req.body;
        if (!usernameoremail || !password) {
            return res.status(400).json({message: 'Please fill all required fields'});
        }
        const user = await User.findOne({$or: [{email: usernameoremail}, {username: usernameoremail}]});
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
        }).status(200).json({success: true, message: 'Login successful', user: userData});
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server error'});
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
        return res.status(200).json({ success: true, message: 'User logged out successfully' });
    } 
    catch (err) {
        console.log(err)
        return res.status(500).json({success: false, message: 'Server error'});
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
        return res.status(500).json({success: false, message: 'Server error'});
    }
}   