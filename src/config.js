import dotenv from "dotenv"; //importar el .env
dotenv.config(); //funcion para coger los .env

export const PORT = process.env.PORT || 4000;

export const BD_HOST = process.env.BD_HOST;
export const BD_PORT = process.env.BD_PORT;
export const BD_USER = process.env.BD_USER;
export const BD_PASS = process.env.BD_PASS;
export const BD_NAME = process.env.BD_NAME;

export const SECRET = process.env.SECRET_JWT;
export const EXPIRES = process.env.EXPIRES_IN;
export const URL_FRONT = process.env.URL_FRONT;

export const TOKEN_SECRET = "llave secreta"; // mi llave para generar mis propios tokens
