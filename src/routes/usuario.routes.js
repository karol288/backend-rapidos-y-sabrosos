import express from "express";
import { createUsuario, deleteUsuario, getAllUsuarios, getUsuarioById, updateUsuario } from "../controllers/Usuarios.controller.js";
import { verificarToken } from "../middleware/verificarToken.js";
import { esAdmin } from "../middleware/esAdmin.js";


const router = express.Router()

router.get("/", verificarToken, esAdmin, getAllUsuarios)//lista todos los usuarios

router.get("/:id", verificarToken, esAdmin, getUsuarioById)//tener un usuario por el id

router.post("/", verificarToken, esAdmin, createUsuario)//crear un usuario 

router.patch("/:id", verificarToken, esAdmin, updateUsuario)//actualizar un usuario por su id

router.delete("/:id", verificarToken, esAdmin, deleteUsuario)//eliminar un usuario por su id 

export default router;