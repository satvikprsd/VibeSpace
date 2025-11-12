import express from 'express';
import { register, login, logout, getProfile, getMe } from '../controllers/user.controller.js';
import { isAuth } from '../components/isAuth.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/profile/:username').get(isAuth, getProfile);
router.route('/me').get(isAuth, getMe);

export default router;