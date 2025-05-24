import express from "express";
import cors from "cors";
import database from "./config/database.js";
import { PORT } from "./config.js";

const app = express();
app.use(cors());
app.use(express.json());

(async () => {
  try {
    await database.authenticate();
    console.log("🟢 Conexión a la base de datos establecida correctamente.");

    // Puedes usar sync solo si quieres sincronizar sin migraciones
    // await database.sync();

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("🔴 Error al conectar a la base de datos:", error);
  }
})();
