import { Router } from "express";
import {
  complaintForm,
  deptRegister,
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

export default router;
