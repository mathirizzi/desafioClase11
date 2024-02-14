import { Router } from "express";
import UserManager from "../UserManager.js";
import auth from "../daos/middleware/authentication.js";

const router = Router();
const sessionsService = new UserManager();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await sessionsService.getUserBy({ email, password });

    if (!user)
      return res.send({
        status: "error",
        error: "Datos incorrectos",
      });

    req.session.user = { id: user._id, username: user.first_name};
    console.log(req.session.user);

    res.status(200).send({
      status: "success",
      payload: req.session.user,
      message: "Login correcto",
    });
  } catch (error) {
    res.send({ status: "error", error: error.message });
  }
});

//---------------------------------------------//

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    console.log({ first_name, last_name, email, password });
    if (email === "" || password === "")
      return res.status(401).send({
        status: "error",
        message: "Faltan llenar campos obligatorios",
      });

    const newUser = {
      first_name,
      last_name,
      email,
      password,
    };

    const result = await sessionsService.createUser(newUser);

    res.status(200).send({
      status: "success",
      payload: newUser,
    });
  } catch (error) {
    res.send({ status: "error", error: error.message });
  }
});

//---------------------------------------------//

router.get("/current", auth, (req, res) => {
  res.send("<h1>datos sensibles</h1>");
});

export default router;
