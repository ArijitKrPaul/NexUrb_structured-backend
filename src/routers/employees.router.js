import { Router } from "express";
import {
  itemAdd,
  itemDelete,
  itemUpdate,
  projectAdd,
  updateProject,
  updateProjectStatus,
} from "../controllers/employees.controller.js";

const router = Router();

router.route("/project").post(projectAdd);

router.route("/itemAdd").post(itemAdd);

router.route("/deleteItem").delete(itemDelete);

router.route("/updateItem").put(itemUpdate);

router.route("/updateProject/:id").patch(updateProject);

router.route("/updateProjectStatus/:id").patch(updateProjectStatus);

export default router;
