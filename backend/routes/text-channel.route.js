import { Router } from "express";
import { isAuth } from "../components/isAuth.js";
import { deleteTextChannel, getChannelMessages, sendMessageToChannel } from "../controllers/text-channel.controller.js";

const router = Router();

router.route("/:channelId").delete(isAuth, deleteTextChannel);
router.route("/:channelId/messages").post(isAuth, sendMessageToChannel);
router.route("/:channelId/messages").get(isAuth, getChannelMessages);

export default router;