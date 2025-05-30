import Orden from "../models/Orden.models.js";
import Metodo_pago from "../models/Metodo_pago.models.js";
import Productos from "../models/Productos.model.js";

export const crearOrden = async (req, res) => {
  try {
    const {
      nombre,
      telefono,
      direccion,
      observaciones,
      comprobante,
      id_metodo_pago,
      id_producto,
    } = req.body;

    // Validación básica
    if (
      !nombre ||
      !telefono ||
      !direccion ||
      !comprobante ||
      !id_metodo_pago ||
      !id_producto
    ) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos obligatorios deben estar completos.",
      });
    }

    const nuevaOrden = await Orden.create({
      nombre,
      telefono,
      direccion,
      observaciones,
      comprobante,
      id_metodo_pago,
      id_producto,
    });

    res.status(201).json({
      success: true,
      message: "Orden creada exitosamente.",
      data: nuevaOrden,
    });
  } catch (error) {
    console.error("Error al crear la orden:", error);
    res.status(500).json({
      success: false,
      message: "Error interno al crear la orden.",
    });
  }
};

export const obtenerOrdenes = async (req, res) => {
  try {
    const ordenes = await Orden.findAll({
      include: [
        {
          model: Metodo_pago,
          as: "metodoPago",
          attributes: ["nombre_metodo"],
        },
        {
          model: Productos,
          as: "producto",
          attributes: ["nombre", "precio"],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: ordenes,
    });
  } catch (error) {
    console.error("Error al obtener las órdenes:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener las órdenes.",
    });
  }
};

export const obtenerOrdenPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const orden = await Orden.findByPk(id, {
      include: [
        {
          model: Metodo_pago,
          as: "metodoPago",
          attributes: ["nombre_metodo"],
        },
        {
          model: Productos,
          as: "producto",
          attributes: ["nombre", "precio"],
        },
      ],
    });

    if (!orden) {
      return res.status(404).json({
        success: false,
        message: "Orden no encontrada.",
      });
    }

    res.status(200).json({
      success: true,
      data: orden,
    });
  } catch (error) {
    console.error("Error al obtener la orden:", error);
    res.status(500).json({
      success: false,
      message: "Error interno al obtener la orden.",
    });
  }
};
