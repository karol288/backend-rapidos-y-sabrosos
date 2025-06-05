import models from "../models/index.js"; // O como se llame tu archivo de asociaciones
const { Orden, Metodo_pago, Producto } = models;

export const crearOrden = async (req, res) => {
  const {
    nombre,
    telefono,
    direccion,
    observaciones,
    comprobante,
    id_metodo_pago,
    productos,
  } = req.body;

  if (
    !nombre ||
    !telefono ||
    !direccion ||
    !comprobante ||
    !id_metodo_pago ||
    !productos ||
    !Array.isArray(productos)
  ) {
    return res.status(400).json({
      success: false,
      message: "Datos incompletos.",
    });
  }

  try {
    // 1. Crear orden
    const nuevaOrden = await Orden.create({
      nombre,
      telefono,
      direccion,
      observaciones,
      comprobante,
      id_metodo_pago,
    });

    // 2. Asociar productos
    for (const item of productos) {
      await nuevaOrden.addProducto(item.id_producto, {
        through: { cantidad: item.cantidad },
      });
    }

    // 3. Obtener la orden con los productos asociados (y cantidades)
    const ordenConProductos = await Orden.findByPk(nuevaOrden.id, {
      include: [
        {
          model: Metodo_pago,
          as: "metodoPago",
          attributes: ["nombre_metodo_pago"],
        },
        {
          model: Producto,
          as: "productos",
          attributes: ["id", "nombre_producto", "precio"],
          through: {
            attributes: ["cantidad"],
          },
        },
      ],
      attributes: { exclude: ["id_producto"] }, // excluir ese campo
    });

    // 4. Responder con orden completa
    res.status(201).json({
      success: true,
      message: "Orden creada exitosamente.",
      data: ordenConProductos,
    });
  } catch (error) {
    console.error("Error al crear la orden:", error);
    res.status(500).json({
      success: false,
      message: "Error  al crear la orden.",
      error: error.message,
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
          attributes: ["nombre_metodo_pago"],
        },
        {
          model: Producto,
          as: "productos",
          attributes: ["nombre_producto", "precio"],
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
      error: error.message, //
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
          attributes: ["nombre_metodo_pago"],
        },
        {
          model: Producto,
          as: "productos",
          attributes: ["id", "nombre_producto", "precio"],
          through: {
            attributes: ["cantidad"],
          },
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
