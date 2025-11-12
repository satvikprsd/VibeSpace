import { Router } from "express";
import { isAuth } from "../components/isAuth";
import { createServer, getServerById, joinServer, leaveServer } from "../controllers/server.controller";

const router = Router();

router.route("/create").post(isAuth, createServer);
router.route("/:serverId").get(isAuth, getServerById);
router.route("/:serverId/join").post(isAuth, joinServer);
router.route("/:serverId/leave").post(isAuth, leaveServer);

export default router;