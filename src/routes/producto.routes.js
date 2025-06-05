import express from "express";
import { verificarToken } from "../middleware/verificarToken.js";
import { esAdmin } from "../middleware/esAdmin.js";

import {
  createProducto,
  deleteProducto,
  getAllProductos,
  getProductoById,
  updateProducto,
} from "../controllers/Productos.controller.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllProductos); //lista todos los productos

router.get("/:id", verificarToken, getProductoById); //tener un producto por el id

router.post(
  "/crear",
  verificarToken,
  esAdmin,
  upload.single("imagen_producto"),
  createProducto
); //crear un producto

router.patch("/:id", verificarToken, esAdmin, updateProducto); //actualizar un producto por su id

router.delete("/:id", verificarToken, esAdmin, deleteProducto); //eliminar un producto por su id

export default router;
