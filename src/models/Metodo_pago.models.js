import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Metodo_pago = sequelize.define(
  "Metodo_pago",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "ID único del metodo de pago ",
    },
    nombre_metodo_pago: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El metodo de pago no puede estar vacio",
        },
        len: {
          args: [2, 100],
          msg: "El metodo de pago debe tener entre 2 y 100 caracteres",
        },
      },
    },

    // por si tiene otros id_ de tablas
  },

  {
    tableName: "metodo_pago", //nombre de la tabla en la base de datos
    timestamps: true, // fecha de actualizacion y creacion
    underscored: true, // snake_case
  }
);

// Relaciones
Metodo_pago.associate = function (models) {
  // Relación con Solicitud (1:N) 1:N es uno a muchos

  //el hasMany se usa cuando nuestra tabla va relacionada a otra tabla
  Metodo_pago.hasMany(models.Orden, {
    foreignKey: "id_metodo_pago",
    as: "Orden",
    onDelete: "CASCADE", //DUDA
  });

  // el belongsTo se usa cuando nuestra tabla tiene una llave foranea
};

export default Productos;
