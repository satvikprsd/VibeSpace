import express from 'express';
import { register, login, logout, getProfile, getMe, getFriends, sendFriendRequest, handleFriendRequest, getPendingFriendRequests } from '../controllers/user.controller.js';
import { isAuth } from '../components/isAuth.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/profile/:username').get(isAuth, getProfile);
router.route('/me').get(isAuth, getMe);
router.route('/friends/request/:friendUsername').post(isAuth, sendFriendRequest);
router.route('/friends/request/action/:requestId').post(isAuth, handleFriendRequest);
router.route('/friends/requests/pending').get(isAuth, getPendingFriendRequests);
router.route('/friends').get(isAuth, getFriends);

export default router;