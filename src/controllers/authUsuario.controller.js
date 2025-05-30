import jwt from "jsonwebtoken";
import Usuario from "../models/Usuarios.models.js";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET, EXPIRES } from "../config.js";

export const register = async (req, res) => {
  const { nombre_completo_usuario, nombre_usuario, contrasena, id_roles } =
    req.body;

  try {
    //verifica si ya hay un usuario con nombre_usuario
    const usuarioExistente = await Usuario.findOne({
      where: { nombre_usuario },
    });

    if (usuarioExistente) {
      return res.status(400).json({
        success: false,
        message: "Ya existe un usuario con ese nombre de usuario",
      });
    }

    //crear el nuevo usuario
    const nuevoUsuario = await Usuario.create({
      nombre_completo_usuario,
      nombre_usuario,
      contrasena,
      id_roles,
    });

    res.status(201).json({
      success: true,
      message: "usuario registrado exitosamente",
      data: {
        id: nuevoUsuario.id_usuario,
        nombre: nuevoUsuario.nombre_completo_usuario,
        nombre_usuario: nuevoUsuario.nombre_usuario,
        rol: nuevoUsuario.id_roles,
      },
    });
  } catch (error) {
    console.error("error al registrar el usuario", error);
    res.status(500).json({
      success: false,
      message: "Error al registrar el usuario",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { nombre_usuario, contrasena } = req.body;

  try {
    //por si el usuario no es encontrado
    const usuario = await Usuario.findOne({ where: { nombre_usuario } });

    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    const contrasenaValida = await bcrypt.compare(
      contrasena,
      usuario.contrasena
    );

    if (!contrasenaValida) {
      return res.status(401).json({
        success: false,
        message: "contraseña incorrecta",
      });
    }
    console.log("Usuario para login:", usuario.toJSON());

    const payload = {
      id_usuario: usuario.id_usuario,
      rol: usuario.id_roles,
    };
    console.log("Payload del token:", payload);

    const token = jwt.sign(payload, TOKEN_SECRET, {
      expiresIn: EXPIRES || "4h",
    });

    res.status(200).json({
      success: true,
      message: "inicio de sesion exitoso",
      data: {
        id: usuario.id_usuario,
        nombre: usuario.nombre_usuario,
        rol: usuario.id_roles,
        token,
      },
    });
  } catch (error) {
    console.log("error al iniciar sesion ", error);
    res.status(500).json({
      success: false,
      message: "error al intentar iniciar sesion",
    });
  }
};
