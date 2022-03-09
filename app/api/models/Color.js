// Cargamos el módulo de mongoose
const mongoose = require("mongoose");
// Definimos los esquemas
const Schema = mongoose.Schema;
// Creamos el objeto del esquema con sus correspondientes campos
const ColorSchema = new Schema(
  {
    hex: { type: String, require: true },
    name: { type: String, require: true },
    rgb: { type: String, require: true },
  },
  { timestamps: true }
);
// Exportamos el modelo para usarlo en otros ficheros
const Color = mongoose.model("colors", ColorSchema);
module.exports = Color;