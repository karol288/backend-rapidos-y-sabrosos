// controllers/Productos.controllers.js
import Productos from "../models/Productos.models.js";
import { Op } from "sequelize";

// Obtener todos los productos
export const getAllProductos = async (req, res) => {
    try {
        const productos = await Productos.findAll({
            order: [["nombre_producto", "ASC"]],
        });

        res.status(200).json({
            success: true,
            data: productos,
        });
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener los productos",
        });
    }
};

// Obtener un producto por ID
export const getProductoById = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Productos.findByPk(id);

        if (!producto) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado",
            });
        }

        res.status(200).json({
            success: true,
            data: producto,
        });
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener el producto",
        });
    }
};

// Crear un producto
export const createProducto = async (req, res) => {
    try {
        const {
            nombre_producto,
            descripcion,
            imagen_producto,
            precio,
            disponibilidad,
            cantidad_disponible,
        } = req.body;

        if (
            !nombre_producto ||
            !descripcion ||
            !imagen_producto ||
            !precio ||
            disponibilidad === undefined ||
            cantidad_disponible === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "Todos los campos son obligatorios",
            });
        }

        const nuevoProducto = await Productos.create({
            nombre_producto,
            descripcion,
            imagen_producto,
            precio,
            disponibilidad,
            cantidad_disponible,
        });

        res.status(201).json({
            success: true,
            message: "Producto creado exitosamente",
            data: nuevoProducto,
        });
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({
            success: false,
            message: "Error al crear el producto",
        });
    }
};

// Actualizar un producto
export const updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            nombre_producto,
            descripcion,
            imagen_producto,
            precio,
            disponibilidad,
            cantidad_disponible,
        } = req.body;

        const producto = await Productos.findByPk(id);

        if (!producto) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado",
            });
        }

        await producto.update({
            nombre_producto: nombre_producto || producto.nombre_producto,
            descripcion: descripcion || producto.descripcion,
            imagen_producto: imagen_producto || producto.imagen_producto,
            precio: precio || producto.precio,
            disponibilidad:
                disponibilidad !== undefined ? disponibilidad : producto.disponibilidad,
            cantidad_disponible:
                cantidad_disponible !== undefined
                    ? cantidad_disponible
                    : producto.cantidad_disponible,
        });

        res.status(200).json({
            success: true,
            message: "Producto actualizado correctamente",
            data: producto,
        });
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({
            success: false,
            message: "Error al actualizar el producto",
        });
    }
};

// Eliminar un producto
export const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const producto = await Productos.findByPk(id);

        if (!producto) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado",
            });
        }

        await producto.destroy();

        res.status(202).json({
            success: true,
            message: "Producto eliminado exitosamente",
        });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({
            success: false,
            message: "Error al eliminar el producto",
        });
    }
};
