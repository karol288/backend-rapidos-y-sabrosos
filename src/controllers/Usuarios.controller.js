import { Op } from "sequelize";
import Usuario from "../models/Usuarios.models.js";
import Roles from "../models/Roles.models.js";
import bcrypt from "bcryptjs";

export const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      order: [["nombre_completo_usuario", "ASC"]], //los trae por el nombre de usuario
      attributes: { exclude: ["contrasena"] }, // ✅ aquí
      include: [
        {
          model: Roles,
          as: "rol",
          attributes: ["nombre_rol"], //tipo de rol
        },
      ],
    });

    res.status(200).json({
      success: true,
      data: usuarios,
    });
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener los usuarios",
      error: error.error
    });
  }
};

export const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id, {
      attributes: { exclude: ["contrasena"] }, // ✅ esto sí está bien
      include: {
        model: Roles,
        as: "rol",
        attributes: ["nombre_rol"],
      },
      attributes: { exclude: ["contrasena"] }, //con esto evitamos que me pase la contraseña cuando pida lo del id
    });

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      data: usuario,
    });
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener usuario",
    });
  }
};

export const createUsuario = async (req, res) => {
  try {
    const { nombre_completo_usuario, nombre_usuario, contrasena, id_roles } =
      req.body;

    //validacion de campos

    if (
      !nombre_completo_usuario ||
      !nombre_usuario ||
      !contrasena ||
      !id_roles
    ) {
      res.status(400).json({
        success: false,
        message: "Todos los campos son obligatorios",
      });
    }

    // Versión más limpia usando Op.eq
    const usuarioExistente = await Usuario.findOne({
      where: { nombre_usuario },
    });

    if (usuarioExistente) {
      return res.status(400).json({
        success: false,
        message: "El nombre de usuario ya esta en uso",
      });
    }

    const nuevoUsuario = await Usuario.create({
      nombre_completo_usuario,
      nombre_usuario,
      contrasena, //ya encriptada
      id_roles,
    });

    res.status(201).json({
      success: true,
      message: "Usuario creado exitosamente",
      data: {
        id: nuevoUsuario.id,
        nombre_completo_usuario: nuevoUsuario.nombre_completo_usuario,
        nombre_usuario: nuevoUsuario.nombre_usuario,
        id_roles: nuevoUsuario.id_roles,
      },
    });
  } catch (error) {
    console.error("Error al crear el usuario :", error);
    res.status(500).json({
      success: false,
      message: "Error al crear el usuario ",
    });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_completo_usuario, nombre_usuario, contrasena, id_roles } =
      req.body;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    // Verificar si el nuevo nombre ya existe (excluyendo el actual)
    if (nombre_usuario && nombre_usuario !== usuario.nombre_usuario) {
      const existeNombreUsuario = await Usuario.findOne({
        where: {
          //por si existe un id con ese nombre de usuario
          nombre_usuario: nombre_usuario,
          id: { [Op.ne]: id },
        },
      });

      //no dejara actualizar ya que este nombre_usuario ya existe
      if (existeNombreUsuario) {
        return res.status(400).json({
          success: false,
          message: "Ya existe otro usuario con este nombre de usuario",
        });
      }
    }

    //si envia otra contraseña nueva la encriptamos

    let nuevaContrasena = usuario.contrasena;

    if (contrasena) {
      const salt = await bcrypt.genSalt(10); //la salt la cantidad de letras
      nuevaContrasena = await bcrypt.hash(contrasena, salt); //para que sea una cadena inconprensible
    }

    await usuario.update({
      nombre_completo_usuario:
        nombre_completo_usuario || usuario.nombre_completo_usuario,
      nombre_usuario: nombre_usuario || usuario.nombre_usuario,

      id_roles: id_roles || usuario.id_roles,
    });

    res.status(200).json({
      success: true,
      message: "usuario actulizado correctamente",
      data: usuario,
    });
  } catch (error) {
    console.error("Error al actualizar tipo de organización:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar el usuario",
      error:
        error.name === "SequelizeUniqueConstraintError"
          ? "Ya existe un usuario con este nombre de usuario"
          : undefined,
    });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      res.status(404).json({
        success: false,
        message: "usuario no encontrado",
      });
    }

    //elimina el usuario
    await usuario.destroy();

    res.status(202).json({
      success: true,
      message: "usuario eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar el usuario", error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar el usuario",
    });
  }
};
