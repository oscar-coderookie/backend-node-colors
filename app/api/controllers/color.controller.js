// Cargamos el modelo recien creado
const Color = require("../models/Color");
// Cargamos el fichero de los HTTPSTATUSCODE
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

//Metodo para retornar todos los colores registrados en la base de datos

const getAllColors = async (req, res, next) => {
  try {
    if (req.query.page) { //Se le añade paginación
      const page = parseInt(req.query.page);
      const skip = (page - 1) * 20;
      const colors = await Color.find().skip(skip).limit(20);
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { colors: colors },
      });
    } else {
      const colors = await Color.find();
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { colors: colors },
      });
    }
  } catch (err) {
    return next(err);
  }
};

// Metodo para la busqueda de colores por ID
const getColorById = async (req, res, next) => {
  try {
    const { colorId } = req.params;
    const colorById = await Color.findById(colorId);
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: { colors: colorById }
    });
  } catch (err) {
    return next(err);
  }
};
//Exportamos las funciones
module.exports = {
  getAllColors,
  getColorById,
}