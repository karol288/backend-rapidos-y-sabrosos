import Orden from "./Orden.models.js";
import Metodo_pago from "./Metodo_pago.models.js";
import Producto from "./Productos.model.js";
import Usuario from "./Usuarios.models.js";
import Roles from "./Roles.models.js";
// Si tienes más modelos, los importas igual
// import Usuario from "./usuario.js";

const models = {
    Orden,
    Metodo_pago,
    Producto,
    Usuario,
    Roles
    // Usuario,
};

// Ejecutar asociaciones
Object.values(models).forEach((model) => {
    if (typeof model.associate === "function") {
        model.associate(models);
    }
});

export default models;
