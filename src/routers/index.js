import { Router } from "express";

import viewsRouter from "./views.router.js";
import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";
import usersRouter from "./users.router.js";
import sessionsRouter from "./sessions.router.js";

const router = Router();

router.use("/api/products", productsRouter);
router.use("/api/carts", cartsRouter);
router.use("/api/products", () => {});
router.use("/", viewsRouter);
router.use("/api/users", usersRouter);
router.use("/api/sessions", sessionsRouter);

export default router;
