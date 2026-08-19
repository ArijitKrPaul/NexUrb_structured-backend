import { Router } from "express";
import {
  addDeptContact,
  addUser,
  deleteUser,
  getContactDetails,
  getDepartmentEmp,
  getUserToAdd,
  updateContactDetails,
} from "../controllers/admin.controller.js";

const router = Router();

router.route("/addContact").post(addDeptContact);

router.route("/getContactDetails").get(getContactDetails);

router.route("/updateContact").put(updateContactDetails);

router.route("/delUser").put(deleteUser);

router.route("/getDepartmentUser").get(getDepartmentEmp);

router.route("/getNewUser").get(getUserToAdd);

router.route("/addUser").put(addUser);

export default router;
