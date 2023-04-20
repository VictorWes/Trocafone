import modelUser from "../model/Model.user.js";

const newUser = (body) => modelUser.create(body);
const findAllUsers = () => modelUser.find();
const findById = (id) => modelUser.findById(id);
const renameUser = (id, name, username, email, password, celular) =>
  modelUser.findOneAndUpdate(
    { _id: id },
    { name, username, email, password, celular }
  );
export default { newUser, findAllUsers, findById, renameUser };
