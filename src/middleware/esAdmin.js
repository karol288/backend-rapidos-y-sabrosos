

export const esAdmin = (req, res, next) => {
    //suponiendo y teniendo en cuenta que admin sea el id 1
    if (req.usuario.id_rol !== 1) {
        return res.status(403).json({
            success: false,
            message: "Acceso denegado: solo administradores pueden realiar esta accion "
        })
    }
    next()
}