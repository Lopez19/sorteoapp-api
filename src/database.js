import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const pe = process.env;
const db = mongoose.connect;

const connectDB = () => {
  db(pe.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("DB is connected"))
    .catch((err) => console.error(err));
};

export default connectDB;
