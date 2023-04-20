import mongoose from "mongoose";
import bcrypt from "bcrypt";

const modelUser = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    select: false,
  },

});

modelUser.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model("Troca-Fone", modelUser);
