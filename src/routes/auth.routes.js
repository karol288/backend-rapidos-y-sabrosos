import express from "express";
import { verificarToken } from "../middleware/verificarToken.js";
import { esAdmin } from "../middleware/esAdmin.js";
import { login, register } from "../controllers/authUsuario.controller.js";

const router = express.Router()

router.post("/registro", verificarToken, esAdmin, register);

router.post("/login", login)

export default router;