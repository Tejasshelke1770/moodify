import app from "./src/app.js";
import connectToDb from "./src/config/db.js";
import { configDotenv } from "dotenv";

configDotenv()
connectToDb()

app.listen(process.env.PORT || 3000, () => {
  console.log("app is listening on port 3000");
});
