import mongoose from "mongoose";

const database = () => {
  console.log("Por favor aguarde, estamos conectado ao database");

  mongoose
    .connect(
      "mongodb+srv://victorWes:drago200@listnodejs.kvj1p7s.mongodb.net/test",

      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("Mongo conectado com sucesso"))
    .catch((error) => console.log(error));
};

export default database;
