import { Router } from "express";
import {
  addDeptContact,
  getContactDetails,
} from "../controllers/admin.controller.js";

const router = Router();

router.route("/addContact").post(addDeptContact);

router.route("/getContactDetails").get(getContactDetails);

export default router;
