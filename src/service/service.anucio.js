import registerPhone from "../model/Model.anucio.js";

const createAnucioService = (body) => registerPhone.create(body);
const findAnucioService = (offset, limit) =>
  registerPhone.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");
const findUniqueAnucioService = (id) =>
  registerPhone.findById(id).populate("user");

const findAllNewsByUser = (id) =>
  registerPhone.find({ user: id }).sort({ _id: -1 }).populate("user");

  const countAnucios = () => registerPhone.countDocuments()
export default {
  createAnucioService,
  findAnucioService,
  findUniqueAnucioService,
  findAllNewsByUser,
  countAnucios
};
