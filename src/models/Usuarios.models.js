import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../config/database.js";

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "ID único de la persona",
    },
    nombre_completo_usuario: {
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
    nombre_usuario: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: {
        unique: {
          name: "uq_nombre_usuario",
          msg: "Ya existe una persona registrada con este nombre de usuario",
        },
        validate: {
          notEmpty: {
            msg: "El nombre de usuario no puede estar vacio",
          },
          len: {
            args: [2, 100],
            msg: "El nombre de usuario debe tener entre 2 y 100 caracteres",
          },
        },
      },
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 255],
          msg: "La contraseña debe tener al menos 8 caracteres",
        },
      },
    },



    //conexiones con otras tablas 
    id_rol: {
      type: DataTypes.INTEGER,
      allowNull: false, //por si quiero que sea null
      comment: "rol del usuario (admin, empleado)",
    },
  },
  {
    tableName: "usuario",
    timestamps: true,
    underscored: true, // snake_case
    hooks: {
      //cuando se guarda
      beforeCreate: async (usuario) => {
        if (usuario.contrasena) {
          const salt = await bcrypt.genSalt(10);
          usuario.contrasena = await bcrypt.hash(usuario.contrasena, salt);
        }
      },
      //para actualizarla
      beforeUpdate: async (usuario) => {
        if (usuario.changed("contrasena")) {
          const salt = await bcrypt.genSalt(10);
          usuario.contrasena = await bcrypt.hash(usuario.contrasena, salt);
        }
      },
    },
  }
);

// Métodos de instancia

//verifica si la contraseña ingresada por el usuario es igual a la encriptada
Usuario.prototype.validarContrasena = function (contrasena) {
  return bcrypt.compareSync(contrasena, this.contrasena);
};

// Relaciones
Usuario.associate = function (models) {
  // Relación con Solicitud (1:N) 1:N es uno a muchos

  //el hasMany se usa cuando nuestra tabla va relacionada a otra tabla
  /*  Persona.hasMany(models.Solicitud, {
    foreignKey: "id_persona",
    as: "solicitudes",
    onDelete: "CASCADE",
  }); */

  // el belongsTo se usa cuando nuestra tabla tiene una llave foranea

  // Relación con Sector (N:1)
  Usuario.belongsTo(models.Roles, {
    foreignKey: "id_rol",
    as: "rol",
    onDelete: "RESTRICT",
  });
};

export default Usuario;
