import { Router } from "express";
import { isAuth } from "../components/isAuth.js";
import { createServer, getServerById, joinServer, leaveServer } from "../controllers/server.controller.js";

const router = Router();

router.route("/create").post(isAuth, createServer);
router.route("/:serverId").get(isAuth, getServerById);
router.route("/:serverId/join").get(isAuth, joinServer);
router.route("/:serverId/leave").get(isAuth, leaveServer);

export default router;