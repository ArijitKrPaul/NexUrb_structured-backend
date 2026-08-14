import sql from "../db/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//normal project get
const projectGet = asyncHandler(async (req, res) => {
  //data fetch from req.query
  //search
  //return res if found

  const state = `%${req.query.state || ""}%`;
  const city = `%${req.query.city || ""}%`;
  const status = (req.query.status || "all").toLowerCase();

  let q;
  if (status === "all") {
    q = await sql`
        SELECT * FROM project
        WHERE state ILIKE ${state} AND city ILIKE ${city}
      `;
  } else {
    q = await sql`
        SELECT * FROM project
        WHERE state ILIKE ${state}
          AND city ILIKE ${city}
          AND LOWER(status) = ${status}
      `;
  }

  return res
    .status(200)
    .json(new ApiResponse(200, q, "projects fetched successfully"));
});

//dept project
const deptProject = asyncHandler(async (req, res) => {
  const state = `%${req.query.state || ""}%`;
  const city = `%${req.query.city || ""}%`;
  const status = (req.query.status || "all").toLowerCase();
  const deptId = req.query.id;

  if (!deptId) {
    throw new ApiError(404, "department id is necessary");
  }

  let q;
  if (status === "all") {
    q = await sql`
        SELECT * FROM project
        WHERE state ILIKE ${state} 
        AND city ILIKE ${city} 
        AND dept_id=${deptId}::uuid
      `;
  } else {
    q = await sql`
        SELECT * FROM project
        WHERE state ILIKE ${state}
          AND city ILIKE ${city}
          AND LOWER(status) = ${status}
          AND dept_id = ${deptId}::uuid
      `;
  }
  return res
    .status(200)
    .json(new ApiResponse(200, q, "Department projects fetched successfully"));
});

const inventoryItems = asyncHandler(async (req, res) => {
  const dept_id = req.query.dept_id;

  if (!dept_id) {
    throw new ApiError(400, "Inventory items cannot be fetched");
  }

  const q =
    await sql`SELECT product_id,name,price,quantity,unit from products where dept_id=${dept_id}`;

  if (q.length === 0) {
    return res.status(200).json(new ApiResponse(200, {}, "No items"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, q, "items fetched successfully"));
});

export { deptProject, inventoryItems, projectGet };
