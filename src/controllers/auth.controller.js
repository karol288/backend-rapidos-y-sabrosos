import { Op } from "sequelize";
import Usuario from "../models/Usuarios.models.js";

export const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      order: [["descripcion_tipo_organizacion", "ASC"]],
    });

    res.status(200).json({
      success: true,
      data: tiposOrganizacion,
    });
  } catch (error) {
    console.error("Error al obtener tipos de organización:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener tipos de organización",
    });
  }
};

export const getTipoOrganizacionById = async (req, res) => {
  try {
    const { id } = req.params;
    const tipoOrganizacion = await TipoOrganizacion.findByPk(id);

    if (!tipoOrganizacion) {
      return res.status(404).json({
        success: false,
        message: "Tipo de organización no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      data: tipoOrganizacion,
    });
  } catch (error) {
    console.error("Error al obtener tipo de organización:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener tipo de organización",
    });
  }
};

export const createTipoOrganizacion = async (req, res) => {
  try {
    const { descripcion_tipo_organizacion } = req.body;

    // Versión más limpia usando Op.eq
    const tipoExistente = await TipoOrganizacion.findOne({
      where: {
        [Op.and]: [
          sequelize.where(
            sequelize.fn(
              "LOWER",
              sequelize.col("descripcion_tipo_organizacion")
            ),
            Op.eq,
            descripcion_tipo_organizacion.toLowerCase()
          ),
        ],
      },
    });

    if (tipoExistente) {
      return res.status(400).json({
        success: false,
        message: "Ya existe un tipo de organización con esta descripción",
      });
    }

    const nuevoTipo = await TipoOrganizacion.create({
      descripcion_tipo_organizacion,
    });

    res.status(201).json({
      success: true,
      message: "Tipo de organización creado exitosamente",
      data: nuevoTipo,
    });
  } catch (error) {
    console.error("Error al crear tipo de organización:", error);
    res.status(500).json({
      success: false,
      message: "Error al crear tipo de organización",
      error:
        error.name === "SequelizeUniqueConstraintError"
          ? "Ya existe un tipo de organización con esta descripción"
          : undefined,
    });
  }
};

export const updateTipoOrganizacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion_tipo_organizacion } = req.body;

    const tipoOrganizacion = await TipoOrganizacion.findByPk(id);

    if (!tipoOrganizacion) {
      return res.status(404).json({
        success: false,
        message: "Tipo de organización no encontrado",
      });
    }

    // Verificar si el nuevo nombre ya existe (excluyendo el actual)
    if (descripcion_tipo_organizacion) {
      const existeDescripcion = await TipoOrganizacion.findOne({
        where: {
          [Op.and]: [
            sequelize.where(
              sequelize.fn(
                "LOWER",
                sequelize.col("descripcion_tipo_organizacion")
              ),
              "=",
              descripcion_tipo_organizacion.toLowerCase()
            ),
            { id_tipo_organizacion: { [Op.ne]: id } },
          ],
        },
      });

      if (existeDescripcion) {
        return res.status(400).json({
          success: false,
          message: "Ya existe otro tipo de organización con esta descripción",
        });
      }
    }

    await tipoOrganizacion.update({
      descripcion_tipo_organizacion:
        descripcion_tipo_organizacion ||
        tipoOrganizacion.descripcion_tipo_organizacion,
    });

    res.status(200).json({
      success: true,
      message: "Tipo de organización actualizado exitosamente",
      data: tipoOrganizacion,
    });
  } catch (error) {
    console.error("Error al actualizar tipo de organización:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar tipo de organización",
      error:
        error.name === "SequelizeUniqueConstraintError"
          ? "Ya existe un tipo de organización con esta descripción"
          : undefined,
    });
  }
};
