import { Router } from "express";
import { githubAuth, githubAuthCallback } from "../controllers/auth.controller.js";

const router = Router();

router.route('/github').get(githubAuth);
router.route('/github/callback').get(githubAuthCallback);

export default router;