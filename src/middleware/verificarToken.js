import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";
import Usuario from "../models/Usuarios.models"

//este middelware se encargara de verificar el token es valido, protegera las rutas privadas
//  y si todo esta bien permite pasar al siguiente middelware


export const verificarToken = async (req, res, next) => {

    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token no proporcionado"
        })
    }

    try {
        //para decodificar el codigo me pase el id y su rol
        const decoded = jwt.verify(token, TOKEN_SECRET)

        //verifica en la base de datos a quien le pertenece el token    
        const usuario = await Usuario.findByPk(decoded.id)

        //por si no encuentra el usuario 
        if (!usuario) {
            return res.status(401).json({
                success: false,
                message: "Uusario no encontrado"
            })
        }

        req.usuario = usuario

        //se llama al next para que continue con el siguiente middelware    
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "token invalido"
        })
    }
}