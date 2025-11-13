import { Router } from "express";
import { isAuth } from "../components/isAuth.js";
import { createServer, generateInvite, getServerById, getUserServers, joinServer, leaveServer } from "../controllers/server.controller.js";

const router = Router();

router.route("/create").post(isAuth, createServer);
router.route("/:serverId/get").get(isAuth, getServerById);
router.route("/all").get(isAuth, getUserServers);
router.route("/:serverId/invite").post(isAuth, generateInvite);
router.route("/:inviteCode/join").get(isAuth, joinServer);
router.route("/:serverId/leave").get(isAuth, leaveServer);

export default router;