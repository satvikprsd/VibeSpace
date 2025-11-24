import { Router } from "express";
import { isAuth } from "../components/isAuth.js";
import { createOrGetConvo, getConvoById, getUserConvos } from "../controllers/convo.controller.js";
import { getMessages, sendMessage } from "../controllers/message.convo.controller.js";

const router = Router();

router.route("/").get(isAuth, getUserConvos);
router.route("/").post(isAuth, createOrGetConvo);
router.route("/:convoId").get(isAuth, getConvoById);
router.route("/:convoId/messages").get(isAuth, getMessages);
router.route("/:convoId/messages").post(isAuth, sendMessage);

export default router;