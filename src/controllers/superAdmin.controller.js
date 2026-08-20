import dotenv from "dotenv";
import { Resend } from "resend";
import sql from "../db/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

dotenv.config({
  path: "./.env",
});

const resend = new Resend(process.env.RESEND_API_KEY);

const getNotifications = asyncHandler(async (req, res) => {
  const q = await sql`SELECT * from notify`;

  if (q.length === 0) {
    throw new ApiError(400, "No requests till now");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, q, "Notifications fetches successfully"));
});

const getRegisteredUsers = asyncHandler(async (req, res) => {
  const q = await sql`SELECT user_id,name,email FROM USERS where role in 
    ('User','user','Project Manager','Inventory Manager','Employee','Support','Admin')`;

  if (q.length === 0) {
    throw new ApiError(400, "Problem is fetching users");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, q, "Users fetched successfully"));
});

const getRegisteredDepartments = asyncHandler(async (req, res) => {
  const q = await sql`SELECT dept_id,name,state,city,location from departments`;

  if (q.length === 0) {
    throw new ApiError(400, "Departments cannot be fetched right now!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, q, "Departments fetched successfully"));
});

const deptAccept = asyncHandler(async (req, res) => {
  const { name, state, city, location, dept_id, user_id } = req.body;

  //first check if user exists or not
  const q = await sql`SELECT email from users where user_id=${user_id}`;

  if (q.length === 0) {
    throw new ApiError(404, "User not found");
  }
  const userEmail = q[0].email;

  //deleting notifications
  await sql`DELETE from NOTIFY where id=${dept_id}`;

  //adding it to the dept table
  await sql`INSERT into departments(dept_id,name,state,city,location) 
  VALUES(${dept_id},${name},${state},${city},${location})`;

  //add dept_id to the particular user_id
  await sql`UPDATE USERS SET role='Admin',dept_id=${dept_id} where user_id=${user_id}`;

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: userEmail,
    subject: "NexUrb Department forming request",
    html: "<p>We are very sorry but the documents uploaded by you weren't enough. So we are <strong>rejecting</strong> the request.</p>",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Department Accepted Successfully"));
});

const deptDecline = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  //removing the notifications
  await sql`DELETE from notify where id=${id}`;

  const existingUser =
    await sql`SELECT name,email from users where user_id=${user_id}`;

  if (existingUser.length === 0) {
    throw new ApiError(404, "User cannot be fetched");
  }

  const userEmail = existingUser[0].email;

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: userEmail,
    subject: "NexUrb Department forming request",
    html: "<p>We are very sorry but the documents uploaded by you weren't enough. So we are <strong>rejecting</strong> the request.</p>",
  });

  if (error) {
    throw new ApiError(400, error.message);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Request declined successfully"));
});

export {
  deptAccept,
  deptDecline,
  getNotifications,
  getRegisteredDepartments,
  getRegisteredUsers,
};
