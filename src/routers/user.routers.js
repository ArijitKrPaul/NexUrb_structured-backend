import { Router } from "express";
import {
  complaintForm,
  deptRegister,
  getComplaints,
  getDepartmentContactDetails,
  loginUser,
  userRegister,
} from "../controllers/user.controller.js";
import {
  handleImageUpload,
  handlePdfUpload,
} from "../middlewares/handleUpload.js";

const router = Router();

router.route("/register").post(userRegister);
router.route("/login").post(loginUser);

router.route("/deptRegister").post(handlePdfUpload, deptRegister);

router.route("/complaint").post(handleImageUpload, complaintForm);

router.route("/getComplaints").get(getComplaints);

router.route("/getContact").get(getDepartmentContactDetails);

export default router;
