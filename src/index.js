import app from "./app";
import connectDB from "./database";

// Connect to database
connectDB();

app.listen(3000, () => {
  console.log("Server is running on port", 3000);
});
