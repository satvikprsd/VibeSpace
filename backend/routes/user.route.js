import express from 'express';
import { getProfile, getMe, updateStatus } from '../controllers/user.controller.js';
import { isAuth } from '../components/isAuth.js';
import { getFriends, getPendingFriendRequests, handleFriendRequest, sendFriendRequest } from '../controllers/friend.controller.js';

const router = express.Router();



router.route('/me').get(isAuth, getMe);
router.route('/me/status').put(isAuth, updateStatus);
router.route('/profile/:username').get(isAuth, getProfile);

router.route('/friends').get(isAuth, getFriends);
router.route('/friends/requests/:username').post(isAuth, sendFriendRequest);
router.route('/friends/requests/:requestId/action').post(isAuth, handleFriendRequest);
router.route('/friends/requests/pending').get(isAuth, getPendingFriendRequests);


export default router;