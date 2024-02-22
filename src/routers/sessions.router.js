import { Router } from "express";
import passport from "passport";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/api/sessions/failregister",
  }),
  async (req, res) => {
    res.send({ status: "success", message: "user registered" });
  }
);

router.get("/failregister", async (req, res) => {
  res.send({ error: "falla en el register" });
});

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/faillogin",
  }),
  async (req, res) => {
    if (!req.user)
      return res
        .status(401)
        .send({ status: "error", error: "credential invalid" });

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      id: req.user._id,
    };
    res.send({ status: "success", message: req.user });
  }
);

router.get("/faillogin", async (req, res) => {
  res.send({ error: "falla en el login" });
});

router.get("/current", async (req, res) => {
  res.send({ message: "datos sensibles" });
});

export default router;
