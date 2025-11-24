import { Router } from "express";
import { githubAuth, githubAuthCallback } from "../controllers/auth.controller.js";
import { login, logout, register } from "../controllers/user.controller.js";
import { isAuth } from "../components/isAuth.js";

const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/github').get(githubAuth);
router.route('/github/callback').get(githubAuthCallback);
router.route('/logout').get(isAuth, logout);

export default router;