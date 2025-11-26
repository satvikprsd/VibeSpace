import { Router } from "express";
import { isAuth } from "../components/isAuth.js";
import { createServer, createTextChannel, deleteServer, generateInvite, getInviteDetails, getServerById, getUserServers, joinServer, leaveServer } from "../controllers/server.controller.js";

const router = Router();

router.route("/").post(isAuth, createServer);
router.route("/:serverId").get(isAuth, getServerById);
router.route("/").get(isAuth, getUserServers);
router.route("/:serverId/invite").post(isAuth, generateInvite);
router.route("/join/:inviteCode").get(isAuth, joinServer);
router.route("/invite/:inviteCode").get(isAuth, getInviteDetails);
router.route("/:serverId/leave").get(isAuth, leaveServer);
router.route("/:serverId").delete(isAuth, deleteServer);
router.route("/:serverId/text-channel").post(isAuth, createTextChannel);

export default router;