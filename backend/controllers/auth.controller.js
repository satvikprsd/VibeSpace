import { User } from "../models/user.model.js";
import axios from "axios";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { InternalServerError } from "./user.controller.js";

export const githubAuth = async (req, res) => {
    const redirectUri = process.env.BACKEND_URL + "/api/v1/auth/github/callback";
    const scope = "read:user user:email repo";
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scope}`;
    res.redirect(githubAuthUrl);
}

export const githubAuthCallback = async (req, res) => {
    try {
        const { code } = req.query;
        if (!code) {
            return res.status(400).json({ message: 'Authorization code not provided' });
        }

        const tokenResponse = await axios.post(
             "https://github.com/login/oauth/access_token",
        {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
        },
        { headers: { Accept: "application/json" } }
        )
        const accessToken = tokenResponse.data.access_token;
        if (!accessToken) {
            return res.status(400).json({ message: 'Failed to obtain access token from GitHub' });
        }
        
        const userResponse = await axios.get("https://api.github.com/user", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const githubProfile = userResponse.data;

        const emailRes = await axios.get("https://api.github.com/user/emails", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        const email = emailRes.data.find((e) => e.primary).email;

        let user = await User.findOne({$or: [{githubId: githubProfile.id}, {email}]});
        if (!user) {
            const hashedPassword = await bcrypt.hash(Math.random().toString(36).slice(-8), 10);
            user = await User({
                username: githubProfile.login,
                githubId: githubProfile.id,
                githubUsername: githubProfile.login,
                githubAccessToken: accessToken,
                githubProfileUrl: githubProfile.html_url,
                name: githubProfile.name || githubProfile.login || 'GitHub User',
                email: email || 'githubuser' + githubProfile.id + '@example.com',
                password: hashedPassword,
                avatar: githubProfile.avatar_url,
            });
            await user.save();
        } else {
            user.githubId = githubProfile.id,
            user.githubUsername = githubProfile.login,
            user.githubAccessToken = accessToken;
            user.githubProfileUrl = githubProfile.html_url,
            user.avatar = user.avatar!='default.jpg' ? user.avatar : githubProfile.avatar_url;
            await user.save();
        }
        
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'});
        res.cookie('token', token, {
            httpOnly: true, 
            sameSite: 'none', 
            secure: true, 
            path: '/',
            maxAge: 30*24*60*60*1000
        });
        res.redirect(`${process.env.FRONTEND_URL}/channels/@me`);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: InternalServerError});
    }
}