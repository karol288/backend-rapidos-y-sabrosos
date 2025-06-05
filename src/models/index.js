import Producto from "./Productos.model.js";
import Orden from "./Orden.models.js";
import Metodo_pago from "./Metodo_pago.models.js";
import OrdenProducto from "./orden_producto.model.js";
import Usuario from "./Usuarios.models.js";
import Roles from "./Roles.models.js";

const models = {
  Producto,
  Orden,
  Metodo_pago,
  OrdenProducto,
  Usuario,
  Roles,
};

// Asociaciones
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export default models;
