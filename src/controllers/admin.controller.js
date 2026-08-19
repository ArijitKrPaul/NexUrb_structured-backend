import sql from "../db/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addDeptContact = asyncHandler(async (req, res) => {
  const { name, number, state, city, email, id } = req.body;

  if (!name || !number || !state || !city || !email || !id) {
    throw new ApiError(400, "all fields are required");
  }

  const existingContact = await sql`SELECT * from contact where dept_id=${id}`;

  if (existingContact.length > 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Contact already exists.Please Update"));
  }

  const newDeptLocation =
    await sql`SELECT location from departments where dept_id=${id}`;

  const location = newDeptLocation[0].location;

  console.log(location);

  await sql`INSERT INTO CONTACT (Name, phone_number, state, city, email, dept_id,location)
      VALUES (${name}, ${number}, ${state}, ${city}, ${email}, ${id},${location})`;

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Contact added Successfully"));
});

const getContactDetails = asyncHandler(async (req, res) => {
  const { dept_id } = req.query;

  const q = await sql`SELECT * from contact where dept_id=${dept_id}`;

  if (q.length === 0) {
    throw new ApiError(400, "Contact does not exist.Please add a contact");
  }

  return res.status(200).json(new ApiResponse(200, q, "Fetched successfully"));
});

const updateContactDetails = asyncHandler(async (req, res) => {
  const { name, state, city, email, number, location, id } = req.body;

  if (!name || !state || !city || !email || !number || !location || !id) {
    throw new ApiError(400, "All fields are required");
  }

  const q = await sql`SELECT * from departments where dept_id=${id}`;

  if (q.length === 0) {
    throw new ApiError(400, "Department does not exist");
  }

  await sql`UPDATE contact
      SET name = ${name},
          state = ${state},
          city = ${city},
          phone_number = ${number},
          email = ${email},
          location=${location}
      WHERE dept_id = ${id} `;

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Contact Updated Successfully"));
});

export { addDeptContact, getContactDetails, updateContactDetails };
