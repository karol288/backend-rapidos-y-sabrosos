import express from "express";
import {
  createMetodoPago,
  deleteMetodoPago,
  getAllMetodosPago,
  getMetodoPagoById,
  updateMetodoPago,
} from "../controllers/metodo_pago.controller.js";

const router = express.Router();

// GET todos los métodos de pago
router.get("/", getAllMetodosPago);

// GET método de pago por ID
router.get("/:id", getMetodoPagoById);

// POST crear nuevo método de pago
router.post("/", createMetodoPago);

// PATCH actualizar método de pago
router.patch("/:id", updateMetodoPago);

// DELETE eliminar método de pago
router.delete("/:id", deleteMetodoPago);

export default router;
