import express from "express";
import cors from "cors";
import database from "./config/database.js";
import { PORT } from "./config.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import authRoutes from "./routes/auth.routes.js";
import productoRoutes from "./routes/producto.routes.js";
import ordenRoutes from "./routes/orden.routes.js";
import metodoPagoRoutes from "./routes/metodoPago.routes.js";
import rolesRoutes from "./routes/roles.routes.js";

// Importa los modelos para que se ejecuten las asociaciones
import "./models/index.js";

/* import sequelize from "./config/database.js"; */

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/productos", productoRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/roles", rolesRoutes);
app.use("/api/ordenes", ordenRoutes);
app.use("/api/metodos-pago", metodoPagoRoutes);
app.use("/api/auth", authRoutes);

/* POR SI NO ENCUENTRA LA RUTA
  app.use((req, res) => {
    res.status(404).json({ success: false, message: "Ruta no encontrada" });
  }); */

(async () => {
  try {
    await database.authenticate();
    console.log("🟢 Conexión a la base de datos establecida correctamente.");

    // Puedes usar sync solo si quieres sincronizar sin migraciones
    await database.sync({ alter: true }); // 🔁 aquí creará las tablas
    console.log("🟢 Modelos sincronizados correctamente.");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("🔴 Error al conectar a la base de datos:", error);
  }
})();
