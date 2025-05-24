import pkg from "pg"; //se importa paquete pg para poder trabajar con bases de datos postgresql
import { BD_HOST, BD_NAME, BD_PASS, BD_PORT, BD_USER } from "../config.js"; //importamos nuestros datos de la db

const { Client } = pkg; //Extraemos la clase de pkg client para enviar los dtos a la bd

//creamos la respuesta del cliente de postgresql con los datos de conexion
const db = new Client({
  host: BD_HOST,
  port: BD_PORT,
  user: BD_USER,
  password: BD_PASS,
  database: BD_NAME,
});

//por si sale mal se hace una promesa para manejar el error
(async () => {
  try {
    await db.connect();
    console.log("base de datos conectada");
  } catch (error) {
    console.error(error);
  }
})();

// Exportamos la instancia del cliente para poder usarla en otras partes del proyecto
export default db;
