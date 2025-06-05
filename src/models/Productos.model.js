import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Producto = sequelize.define(
  "producto",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "ID único de los productos ",
    },
    nombre_producto: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El nombre del producto no puede estar vacio",
        },
        len: {
          args: [2, 100],
          msg: "El nombre del producto debe tener entre 2 y 100 caracteres",
        },
      },
    },

    descripcion: {
      type: DataTypes.STRING(800),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "La descripcion del producto no puede estar vacia ",
        },
        len: {
          args: [2, 800],
          msg: "La descripcion debe tener entre 2 y 300 caracteres",
        },
      },
    },

    imagen_producto: {
      type: DataTypes.TEXT, //duda
      allowNull: false,
      validate: {
        /*  len: { DUDA
          args: [5, 500],
          msg: "La dirección debe tener entre 5 y 500 caracteres",
        }, */
        notEmpty: {
          msg: "La imagen del producto no puede est ar vacia",
        },
      },
    },

    precio: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: {
          args: [0.01],
          msg: "El precio debe ser mayor a 0",
        },
        notNull: {
          msg: "El precio es obligatorio",
        },
      },
    },

    disponibilidad: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo disponibilidad es obligatorio ",
        },
      },
    },

    cantidad_disponible: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          mgs: "El cmapo cantidad disponible es obligatorio",
        },
        isInt: {
          msg: "la cantidad debe ser un numero entero",
        },
        min: {
          args: [0],
          msg: "La cantidad disponible no puede ser negativa",
        },
      },
    },

    // por si tiene otros id_ de tablas
  },

  {
    tableName: "productos", //nombre de la tabla en la base de datos
    timestamps: true, // fecha de actualizacion y creacion
    underscored: true, // snake_case
  }
);

// Relaciones
Producto.associate = function (models) {
  // Relación con Solicitud (1:N) 1:N es uno a muchos
  Producto.belongsToMany(models.Orden, {
    through: models.OrdenProducto,
    foreignKey: "producto_id",
    otherKey: "orden_id",
    as: "ordenes",
  });
  //el hasMany se usa cuando nuestra tabla va relacionada a otra tabla
  Producto.hasMany(models.Orden, {
    foreignKey: "id_producto",
    as: "ordenesProductos",
    onDelete: "CASCADE", //DUDA
  });

  // el belongsTo se usa cuando nuestra tabla tiene una llave foranea
};

export default Producto;
