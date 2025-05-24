import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Roles = sequelize.define(
  "Roles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "ID único de los roles ",
    },
    nombre_rol: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El nombre del rol no puede estar vacio",
        },
        len: {
          args: [2, 100],
          msg: "El rol debe tener entre 2 y 100 caracteres",
        },
      },
    },

    // por si tiene otros id_ de tablas
  },

  {
    tableName: "roles", //nombre de la tabla en la base de datos
    timestamps: true, // fecha de actualizacion y creacion
    underscored: true, // snake_case
  }
);

// Relaciones
Roles.associate = function (models) {
  // Relación con Solicitud (1:N) 1:N es uno a muchos

  //el hasMany se usa cuando nuestra tabla va relacionada a otra tabla
  Roles.hasMany(models.Usuario, {
    foreignKey: "id_rol",
    as: "usuarios",
    onDelete: "CASCADE", //DUDA
  });

  // el belongsTo se usa cuando nuestra tabla tiene una llave foranea
};

export default Roles;
