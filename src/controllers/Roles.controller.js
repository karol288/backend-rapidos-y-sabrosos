import Roles from "../models/Roles.models.js";

// Obtener todos los roles
export const getAllRoles = async (req, res) => {
    try {
        const roles = await Roles.findAll({
            order: [["nombre_rol", "ASC"]],
        });

        res.status(200).json({
            success: true,
            data: roles,
        });
    } catch (error) {
        console.error("Error al obtener los roles:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener los roles",
        });
    }
};

// Obtener un rol por ID
export const getRolById = async (req, res) => {
    try {
        const { id } = req.params;
        const rol = await Roles.findByPk(id);

        if (!rol) {
            return res.status(404).json({
                success: false,
                message: "Rol no encontrado",
            });
        }

        res.status(200).json({
            success: true,
            data: rol,
        });
    } catch (error) {
        console.error("Error al obtener el rol:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener el rol",
        });
    }
};

// Crear un rol
export const createRol = async (req, res) => {
    try {
        const { nombre_rol } = req.body;

        if (!nombre_rol) {
            return res.status(400).json({
                success: false,
                message: "El nombre del rol es obligatorio",
            });
        }

        const existeRol = await Roles.findOne({ where: { nombre_rol } });

        if (existeRol) {
            return res.status(400).json({
                success: false,
                message: "Ya existe un rol con este nombre",
            });
        }

        const nuevoRol = await Roles.create({ nombre_rol });

        res.status(201).json({
            success: true,
            message: "Rol creado exitosamente",
            data: nuevoRol,
        });
    } catch (error) {
        console.error("Error al crear el rol:", error);
        res.status(500).json({
            success: false,
            message: "Error al crear el rol",
        });
    }
};

// Actualizar un rol
export const updateRol = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_rol } = req.body;

        const rol = await Roles.findByPk(id);

        if (!rol) {
            return res.status(404).json({
                success: false,
                message: "Rol no encontrado",
            });
        }

        // Validar nombre duplicado si es diferente
        if (nombre_rol && nombre_rol !== rol.nombre_rol) {
            const rolExistente = await Roles.findOne({
                where: { nombre_rol },
            });

            if (rolExistente) {
                return res.status(400).json({
                    success: false,
                    message: "Ya existe un rol con este nombre",
                });
            }
        }

        await rol.update({
            nombre_rol: nombre_rol || rol.nombre_rol,
        });

        res.status(200).json({
            success: true,
            message: "Rol actualizado correctamente",
            data: rol,
        });
    } catch (error) {
        console.error("Error al actualizar el rol:", error);
        res.status(500).json({
            success: false,
            message: "Error al actualizar el rol",
        });
    }
};

// Eliminar un rol
export const deleteRol = async (req, res) => {
    try {
        const { id } = req.params;

        const rol = await Roles.findByPk(id);

        if (!rol) {
            return res.status(404).json({
                success: false,
                message: "Rol no encontrado",
            });
        }

        await rol.destroy();

        res.status(202).json({
            success: true,
            message: "Rol eliminado exitosamente",
        });
    } catch (error) {
        console.error("Error al eliminar el rol:", error);
        res.status(500).json({
            success: false,
            message: "Error al eliminar el rol",
        });
    }
};
