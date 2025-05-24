import express from "express";
import cors from "cors";
import database from "./config/database.js";
import { PORT } from "./config.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import authRoutes from "./routes/auth.routes.js";



const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/usuarios", usuarioRoutes)
app.use("/api/auth", authRoutes)

  /* POR SI NO ENCUENTRA LA RUTA
  app.use((req, res) => {
    res.status(404).json({ success: false, message: "Ruta no encontrada" });
  }); */

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
