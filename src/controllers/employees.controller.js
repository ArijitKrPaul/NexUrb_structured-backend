import sql from "../db/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const projectAdd = asyncHandler(async (req, res) => {
  //get info from req.body
  //get the dept name
  //select the dept name from the array of objects
  //add it to the db

  const { name, type, id, description, state, city } = req.body;
  console.log(req.body);

  const existingDept =
    await sql`SELECT name from departments where dept_id=${id}`;

  if (existingDept.length === 0) {
    throw new ApiError(400, {}, "No departments found");
  }

  console.log(existingDept);

  const deptName = existingDept[0].name;

  console.log(deptName);

  await sql`
      INSERT INTO project
        ("Name","type","description","dept_name","state","city","status","date",dept_id)
      VALUES (
        ${name},
        ${type},
        ${description},
        ${deptName},
        ${state},
        ${city},
        'ongoing',
        NOW(),
        ${id}
      )
    `;

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Project added successfully"));
});

const itemAdd = asyncHandler(async (req, res) => {
  //take item related data as inputs
  //take the dept_id
  //insert the data into the database

  const { dept_id, name, amount, price, unit } = req.body;

  const q =
    await sql`SELECT * from products where name=${name} and dept_id=${dept_id}`;

  if (q.length > 0) {
    throw new ApiError(404, "item already exists");
  }

  await sql`INSERT into products(name,quantity,price,dept_id,unit) VALUES(${name},${amount},${price},${dept_id},${unit})`;

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Item added successfully"));
});

const itemDelete = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { product_id, dept_id } = req.body;

  if (!dept_id || !product_id) {
    throw new ApiError(404, "Cannot be deleted");
  }

  const q =
    await sql`SELECT * from products where product_id=${product_id} and dept_id=${dept_id}`;

  if (q.length === 0) {
    throw new ApiError(200, "Item does not exist");
  }

  await sql`DELETE from products where product_id=${product_id} and dept_id=${dept_id}`;

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Item deleted Successfully"));
});
export { itemAdd, itemDelete, projectAdd };
