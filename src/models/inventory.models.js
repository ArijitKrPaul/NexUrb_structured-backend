import mongoose, { model } from "mongoose";

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
});

const Inventory = new model("Inventory", inventorySchema);
