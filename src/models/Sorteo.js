import { Schema, model } from "mongoose";

const sorteoSchema = new Schema(
  {
    name: String,
    description: String,
    date: Date,
    winner: String,
    participants: [],
    price: Number,
    status: Boolean,
    maxParticipants: Number,
    imgURL: String,
    creator: String,
    reward: String,
  },
  { timestamps: true, versionKey: false }
);

export default model("Sorteo", sorteoSchema);
