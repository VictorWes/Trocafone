import mongoose from "mongoose";

const registerPhone = new mongoose.Schema({
  modelPhone: {
    type: String,
    require: true,
  },
  usageTime: {
    type: String,
    require: true,
  },
  numeroParaContato: {
    type: String,
    require: true,
    minLength: 11,
    maxLength: 11
  },
  valorPhoneTrocaPor: {
    type: String,
    require: true,
   
  },
  city: {
    type: String,
    require: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Troca-Fone",
    require: true,
  },
});

// valorPhoneTrocaPor Nessa parte descreve por qual valor deseja vender ou se aceita também trocas

export default mongoose.model("RegistroAnucio", registerPhone);
