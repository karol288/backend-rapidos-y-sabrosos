import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Orden = sequelize.define(
  "orden",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "ID único de la orden ",
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El nombre no puede estar vacío",
        },
        len: {
          args: [2, 100],
          msg: "El nombre debe tener entre 2 y 100 caracteres",
        },
      },
    },

    telefono: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        is: {
          args: /^[0-9()+-\s]+$/,
          msg: "Formato de teléfono inválido",
        },
      },
    },

    direccion: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [5, 500],
          msg: "La dirección debe tener entre 5 y 500 caracteres",
        },
      },
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: {
          args: [0, 500],
          msg: "Las observaciones no pueden tener mas de 500 caracteres ",
        },
      },
    },
    comprobante: {
      type: DataTypes.STRING(225),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Debes agregar un comprobante de pago",
        } /*  DUDA
        len: {
          args: [2, 255],
          msg: "",
        }, */,
      },
    },

    // por si tiene otros id_ de tablas
    id_metodo_pago: {
      type: DataTypes.INTEGER,
      allowNull: false, //por si quiero que sea null en este caso no
      comment: "El tipo de pago a realizar (efectivo, transferencia)",
    },
  },

  {
    tableName: "orden", //nombre de la tabla en la base de datos
    timestamps: true, // fecha de actualizacion y creacion
    underscored: true, // snake_case
  }
);

// Relaciones
Orden.associate = function (models) {
  // Relación con Solicitud (1:N) 1:N es uno a muchos

  // Relación con Sector (N:1)
  Orden.belongsTo(models.Metodo_pago, {
    foreignKey: "id_metodo_pago",
    as: "metodoPago",
  });

  Orden.belongsToMany(models.Producto, {
    through: models.OrdenProducto,
    foreignKey: "orden_id",
    otherKey: "producto_id",
    as: "productos",
  });
};

export default Orden;
