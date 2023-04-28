import mongoose from "mongoose";

const database = () => {
  console.log("Por favor aguarde, estamos conectado ao database");

  mongoose
    .connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Mongo conectado com sucesso"))
    .catch((error) => console.log(error));
};

export default database;
