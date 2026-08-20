import { Router } from "express";
import {
  deptAccept,
  deptDecline,
  getNotifications,
  getRegisteredDepartments,
  getRegisteredUsers,
} from "../controllers/superAdmin.controller.js";

const router = Router();

router.route("/newNotifications").get(getNotifications);

router.route("/users").get(getRegisteredUsers);

router.route("/departments").get(getRegisteredDepartments);

router.route("/onDecline/:id").delete(deptDecline);

router.route("/onAccept").post(deptAccept);

export default router;
