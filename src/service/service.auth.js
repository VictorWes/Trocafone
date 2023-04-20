import modelUser from "../model/Model.user.js";
import jwt from "jsonwebtoken";

const validEmailPassword = (email) =>
  modelUser.findOne({ email: email }).select("+password");

const generateToken = (id) =>
  jwt.sign({ id: id }, "2f4fda8e8658c41a6fc7022d29024179", {
    expiresIn: 86400,
  });
export { validEmailPassword, generateToken };
