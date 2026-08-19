import { Router } from "express";
import {
  addDeptContact,
  getContactDetails,
  updateContactDetails,
} from "../controllers/admin.controller.js";

const router = Router();

router.route("/addContact").post(addDeptContact);

router.route("/getContactDetails").get(getContactDetails);

router.route("/updateContact").put(updateContactDetails);

export default router;
