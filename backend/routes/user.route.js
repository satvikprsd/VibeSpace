import express from 'express';
import { register, login, logout, getProfile } from '../controllers/user.controller.js';
import { isAuth } from '../components/isAuth.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/profile/:username').get(isAuth, getProfile);

export default router;