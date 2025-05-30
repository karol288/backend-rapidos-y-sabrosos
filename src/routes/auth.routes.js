import express from "express";
import { verificarToken } from "../middleware/verificarToken.js";
import { esAdmin } from "../middleware/esAdmin.js";
import { login, register } from "../controllers/authUsuario.controller.js";
import Usuario from "../models/Usuarios.models.js";

const router = express.Router();

router.post(
  "/registro",
  async (req, res, next) => {
    try {
      const adminExistente = await Usuario.findOne({ where: { id_roles: 1 } });
      if (!adminExistente) {
        // No hay admin aún, permitir crear sin token
        return next();
      }
      //pero si ya existe un admin, debera proterlo con el middelware

      verificarToken(req, res, (err) => {
        if (err) return;
        esAdmin(req, res, next);
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error interno al verificar admin",
        error: error.message,
      });
    }
  },
  register
);

router.post("/login", login);

export default router;
