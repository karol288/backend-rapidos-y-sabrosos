import express from "express";
import { verificarToken } from "../middleware/verificarToken.js";
import { esAdmin } from "../middleware/esAdmin.js";
import {
  createRol,
  deleteRol,
  getAllRoles,
  getRolById,
  updateRol,
} from "../controllers/Roles.controller.js";

const router = express.Router();

router.get("/", verificarToken, getAllRoles); //lista todos los productos

router.get("/:id", verificarToken, getRolById); //tener un rol por el id

router.post("/", verificarToken, esAdmin, createRol); //crear un rol

router.patch("/:id", verificarToken, esAdmin, updateRol); //actualizar un rol por su id

router.delete("/:id", verificarToken, esAdmin, deleteRol); //eliminar un rol por su id

export default router;
