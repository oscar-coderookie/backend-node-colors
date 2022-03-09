//importamos Router de express
const express = require("express");
const router = express.Router();
//importamos nuestro middleware
const { isAuth } = require("../../middlewares/auth.middleware");
//importamos las funciones del controlador
const {
    newPalette,
    getAllPalettes,
    getPalettesById,
    deletePaletteById,
    updatePaletteById,
    getAllPalettesByUser
} = require("../controllers/palette.controller");

//ruta para crear paleta
router.post("/create", [isAuth], newPalette);
//ruta para obtener todas las paletas
router.get("/", [isAuth], getAllPalettes);
//ruta para obtener las paletas de un usuario
router.get("/palettesbyuser", [isAuth], getAllPalettesByUser)
//ruta para obtener una paleta por id
router.get("/:paletteId", [isAuth], getPalettesById);
//ruta para borrar una paleta
router.delete("/:paletteId", [isAuth], deletePaletteById)
//ruta para modificar una paleta
router.put("/:paletteId", [isAuth], updatePaletteById)
//exportamos las rutas
module.exports = router;