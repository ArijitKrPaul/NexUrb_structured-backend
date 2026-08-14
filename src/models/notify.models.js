import mongoose, { model } from "mongoose";

const notifySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  state: {
    type: String,
    required: true,
    lowercase: true,
  },
  city: {
    type: String,
    required: true,
    lowercase: true,
  },
  address: {
    type: String,
    required: true,
    lowercase: True,
  },
  document: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Notification = new model("Notification", notifySchema);
