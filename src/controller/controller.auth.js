import { validEmailPassword, generateToken } from "../service/service.auth.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    const checkEmail = await validEmailPassword(email);

    if (!checkEmail) {
      return res.status(400).send("E-mail invalido ou senha invalida");
    }

    const passwordIsValid = await bcrypt.compare(password, checkEmail.password);

    if (!passwordIsValid) {
      return res.status(400).send("E-mail invalido ou senha invalida");
    }

    const validIdByJwt = generateToken(checkEmail.id);

    res.status(200).send({ validIdByJwt });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
export { login };
