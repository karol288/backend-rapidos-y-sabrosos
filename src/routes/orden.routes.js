import express from "express";
import { verificarToken } from "../middleware/verificarToken.js";
import {
  crearOrden,
  obtenerOrdenes,
  obtenerOrdenPorId,
} from "../controllers/Orden.controller.js";

const router = express.Router();

router.post("/", crearOrden); //realizar un pedido

//rutas protegidas

router.get("/", verificarToken, obtenerOrdenes); //actualizar una orden por su id

router.get("/:id", verificarToken, obtenerOrdenPorId); //eliminar una orden por su id

export default router;
