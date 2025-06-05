import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const OrdenProducto = sequelize.define(
  "orden_producto",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [1],
          msg: "La cantidad debe ser al menos 1",
        },
        isInt: {
          msg: "La cantidad debe ser un número entero",
        },
      },
    },
  },
  {
    tableName: "orden_producto",
    timestamps: false,
    underscored: true,
  }
);

export default OrdenProducto;
