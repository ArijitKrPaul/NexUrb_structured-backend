import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

import app from "./app.js";

app.listen(process.env.PORT, () => {
  console.log(`the server is connected at ${process.env.PORT}`);
});
