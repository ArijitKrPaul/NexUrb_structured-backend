import { Router } from "express";
import {
  deptProject,
  inventoryItems,
  projectGet,
} from "../controllers/department.controller.js";

const router = Router();

router.route("/allProject").get(projectGet);

router.route("/project").get(deptProject);

router.route("/inventory").get(inventoryItems);

export default router;
