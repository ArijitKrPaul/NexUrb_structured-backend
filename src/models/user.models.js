import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: string,
    required: true,
    lowercase: true,
  },
  role: {
    type: String,
    default: "user",
  },
  dept_id: {
    type: mongoose.Schema.Types.objectId,
    ref: "Dept",
    default: null,
  },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = new model("User", userSchema);
