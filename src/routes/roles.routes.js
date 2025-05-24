import express from "express";
import { verificarToken } from "../middleware/verificarToken.js";
import { esAdmin } from "../middleware/esAdmin.js";
import { createRol, deleteRol, getAllRoles, getRolById, updateRol } from "../controllers/Roles.controller.js";


const router = express.Router()

router.get("/", getAllRoles)//lista todos los productos

router.get("/:id", getRolById)//tener un producto por el id

router.post("/", verificarToken, esAdmin, createRol)//crear un producto 

router.patch("/:id", verificarToken, esAdmin, updateRol)//actualizar un producto por su id

router.delete("/:id", verificarToken, esAdmin, deleteRol)//eliminar un producto por su id 

export default router;