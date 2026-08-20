import cors from "cors";
import express from "express";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

//routes
import deptRouter from "../src/routers/dept.routers.js";
import deptAdminRouter from "../src/routers/deptAdmin.routers.js";
import empRouter from "../src/routers/employees.router.js";
import superAdminRouter from "../src/routers/superAdmin.routers.js";
import userRouter from "../src/routers/user.routers.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/dept", deptRouter);
app.use("/api/v1/emp", empRouter);
app.use("/api/v1/deptAdmin", deptAdminRouter);
app.use("/api/v1/superAdmin", superAdminRouter);

export default app;
