import { Sequelize } from "sequelize";
import { BD_HOST, BD_NAME, BD_PASS, BD_PORT, BD_USER } from "../config.js";

const sequelize = new Sequelize(BD_NAME, BD_USER, BD_PASS, {
  host: BD_HOST,
  port: BD_PORT,
  dialect: "postgres",
});

export default sequelize;
