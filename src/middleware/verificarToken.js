import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import Usuario from "../models/Usuarios.models.js";

//este middelware se encargara de verificar el token es valido, protegera las rutas privadas
//  y si todo esta bien permite pasar al siguiente middelware
export const verificarToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("Auth Header:", authHeader);

  const token = authHeader?.split(" ")[1];
  console.log("Token extraído:", token);

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    console.log("Token decodificado:", decoded);

    const usuario = await Usuario.findByPk(decoded.id_usuario);
    console.log("Usuario encontrado:", usuario);

    if (!usuario) {
      return res
        .status(401)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.error("Error en verificarToken:", error);
    return res.status(401).json({ success: false, message: "Token inválido" });
  }
};
