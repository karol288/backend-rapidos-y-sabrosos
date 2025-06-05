import multer from "multer";
import path from "path";
import fs from "fs";

// Ruta donde se guardarán las imágenes
const carpetaUploads = "uploads/";
if (!fs.existsSync(carpetaUploads)) fs.mkdirSync(carpetaUploads);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, carpetaUploads);
  },
  filename: (req, file, cb) => {
    const nombreUnico = Date.now() + "-" + file.originalname;
    cb(null, nombreUnico);
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // máximo 5MB
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".gif") {
      return cb(new Error("Solo se permiten imágenes"));
    }
    cb(null, true);
  },
});
