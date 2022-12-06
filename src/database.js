import mongoose from "mongoose";

const db = mongoose.connect;

const connectDB = () => {
  db("mongodb://0.0.0.0:27017/sorteosdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("DB is connected"))
    .catch((err) => console.error(err));
};

export default connectDB;
