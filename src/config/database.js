import { Sequelize } from "sequelize";
import { BD_HOST, BD_NAME, BD_PASS, BD_PORT, BD_USER } from "../config.js";

const sequelize = new Sequelize(BD_NAME, BD_USER, BD_PASS, {
  host: BD_HOST,
  port: Number(BD_PORT),
  dialect: "postgres",
});
console.log("Tipo de BD_PASS:", typeof BD_PASS);
console.log("Tipo de BD_PORT:", typeof BD_PORT);


export default sequelize;
