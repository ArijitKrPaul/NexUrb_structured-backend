import { Router } from "express";
import {
  itemAdd,
  itemDelete,
  projectAdd,
} from "../controllers/employees.controller.js";

const router = Router();

router.route("/project").post(projectAdd);

router.route("/itemAdd").post(itemAdd);

router.route("/deleteItem").delete(itemDelete);

export default router;
