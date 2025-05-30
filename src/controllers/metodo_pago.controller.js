import Metodo_pago from "../models/Metodo_pago.models.js";
import { Op } from "sequelize";

// Obtener todos los métodos de pago
export const getAllMetodosPago = async (req, res) => {
  try {
    const metodos = await Metodo_pago.findAll({
      order: [["nombre_metodo_pago", "ASC"]],
    });

    res.status(200).json({
      success: true,
      data: metodos,
    });
  } catch (error) {
    console.error("Error al obtener los métodos de pago:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener los métodos de pago",
    });
  }
};

// Obtener método de pago por ID
export const getMetodoPagoById = async (req, res) => {
  try {
    const { id } = req.params;
    const metodo = await Metodo_pago.findByPk(id);

    if (!metodo) {
      return res.status(404).json({
        success: false,
        message: "Método de pago no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      data: metodo,
    });
  } catch (error) {
    console.error("Error al obtener el método de pago:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener el método de pago",
    });
  }
};

// Crear método de pago
export const createMetodoPago = async (req, res) => {
  try {
    const { nombre_metodo_pago } = req.body;

    if (!nombre_metodo_pago) {
      return res.status(400).json({
        success: false,
        message: "El nombre del método de pago es obligatorio",
      });
    }

    const existe = await Metodo_pago.findOne({
      where: { nombre_metodo_pago },
    });

    if (existe) {
      return res.status(400).json({
        success: false,
        message: "Ya existe un método de pago con ese nombre",
      });
    }

    const nuevoMetodo = await Metodo_pago.create({ nombre_metodo_pago });

    res.status(201).json({
      success: true,
      message: "Método de pago creado exitosamente",
      data: nuevoMetodo,
    });
  } catch (error) {
    console.error("Error al crear el método de pago:", error);
    res.status(500).json({
      success: false,
      message: "Error al crear el método de pago",
    });
  }
};

// Actualizar método de pago
export const updateMetodoPago = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_metodo_pago } = req.body;

    const metodo = await Metodo_pago.findByPk(id);

    if (!metodo) {
      return res.status(404).json({
        success: false,
        message: "Método de pago no encontrado",
      });
    }

    // Verificar si otro método ya tiene ese nombre
    if (
      nombre_metodo_pago &&
      nombre_metodo_pago !== metodo.nombre_metodo_pago
    ) {
      const existeNombre = await Metodo_pago.findOne({
        where: {
          nombre_metodo_pago,
          id: { [Op.ne]: id },
        },
      });

      if (existeNombre) {
        return res.status(400).json({
          success: false,
          message: "Ya existe otro método de pago con ese nombre",
        });
      }
    }

    await metodo.update({
      nombre_metodo_pago: nombre_metodo_pago || metodo.nombre_metodo_pago,
    });

    res.status(200).json({
      success: true,
      message: "Método de pago actualizado correctamente",
      data: metodo,
    });
  } catch (error) {
    console.error("Error al actualizar el método de pago:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar el método de pago",
    });
  }
};

// Eliminar método de pago
export const deleteMetodoPago = async (req, res) => {
  try {
    const { id } = req.params;

    const metodo = await Metodo_pago.findByPk(id);

    if (!metodo) {
      return res.status(404).json({
        success: false,
        message: "Método de pago no encontrado",
      });
    }

    await metodo.destroy();

    res.status(202).json({
      success: true,
      message: "Método de pago eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar el método de pago:", error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar el método de pago",
    });
  }
};
