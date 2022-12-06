import app from "./app";
import connectDB from "./database";
import dotenv from "dotenv";
dotenv.config();

// Port
const port = process.env.PORT || 3000;

// Connect to database
connectDB();

app.listen(port, () => {
  console.log("Server is running on port", port);
});
