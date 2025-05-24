import { Sequelize } from "sequelize";

const sequelize = new Sequelize("rapidos-sabrosos", "postgres", "123", {
  host: "localhost",
  dialect: "postgres",
});

export default sequelize;
