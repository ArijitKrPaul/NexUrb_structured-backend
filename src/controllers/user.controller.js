import sql from "../db/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { comparePassowrd, hashPassword } from "../utils/password.js";

const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //req.body
  //check if the email exists or not
  //hash the password
  //insert into database

  const role = "USER";

  const existingUser = await sql`SELECT from users where email=${email}`;

  if (existingUser.length > 0) {
    throw new ApiError(200, "user already exists");
  }
  const hashedPassword = await hashPassword(password);

  const user =
    await sql`INSERT into users  (name,email,password,role) VALUES(${name},${email},${hashedPassword},${role})`;

  return res
    .status(200)
    .json(new ApiResponse(200, "user registered successfully", true));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //req.body
  //check if the user exists or not
  //check password
  //send response
  console.log(email, password);

  const existingUser = await sql`SELECT * from USERS where email=${email}`;

  if (existingUser.length === 0) {
    throw new ApiError(200, "user doesnt exist");
  }

  const hashedPassword = existingUser[0].password;

  if (!(await comparePassowrd(password, hashedPassword))) {
    throw new ApiError(404, "password is incorrect");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, existingUser[0], "user found"));
});

const deptRegister = asyncHandler(async (req, res) => {
  //req.body
  //multer already uploading the pdfs to disk
  //check if we have received the file or not
  //store the path in the db
  const { name, state, city, location, user_id } = req.body;

  console.log(req.body);

  if (!req.file) {
    throw new ApiError(400, "PDF file is required");
  }

  console.log(req.file);

  const pdfDoc = {
    originalName: req.file.originalname,
    path: `documents/${req.file.filename}`,
    fileName: req.file.filename,
  };

  await sql`
    INSERT INTO notify
      (
        dept_name,
        state,
        city,
        location,
        user_id,
        stored_name,
        original_name,
        path
      )
      VALUES
      (
        ${req.body.name},
        ${req.body.state},
        ${req.body.city},
        ${req.body.location},
        ${req.body.user_id},
        ${pdfDoc.fileName},
        ${pdfDoc.originalName},
        ${pdfDoc.path}
      )
    `;

  return res
    .status(200)
    .json(new ApiResponse(200, "Department registered successfully"));
});

const complaintForm = asyncHandler(async (req, res) => {
  //get info from req.body
  //check if the file is uploaded or not
  //if uploaded post the filename path and rest of the data in db

  const { name, email, state, city, location, description, id } = req.body;

  if (!req.file) {
    throw new ApiError(400, "File not Found");
  }

  const imgDoc = {
    originalName: req.file.originalname,
    fileName: req.file.filename,
    path: `documents/${req.file.filename}`,
  };

  await sql`
      INSERT INTO complaints (name, email, state, city, description, stored_name, original_name, path,location,user_id)
      VALUES (${name}, ${email}, ${state}, ${city}, ${description}, ${imgDoc.fileName}, ${imgDoc.originalName}, ${imgDoc.path},${location},${id})
    `;

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Complaint submitted successfully"));
});

const getComplaints = asyncHandler(async (req, res) => {
  const { id } = req.query;

  const q = await sql`SELECT * from COMPLAINTS where user_id=${req.query.id}`;

  if (q.length === 0) {
    return res.status(200).json(new ApiResponse(200, {}, "No complaints yet"));
  }

  console.log(q);
  return res
    .status(200)
    .json(new ApiResponse(200, q, "Complaints fetched successfully"));
});

export { complaintForm, deptRegister, getComplaints, loginUser, userRegister };
