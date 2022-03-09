// Cargamos el modelo 
const User = require("../models/User");
// Cargamos el módulo de bcrypt
const bcrypt = require("bcrypt");
// Cargamos el módulo de jsonwebtoken
const jwt = require("jsonwebtoken");
// Cargamos el fichero de los HTTPSTATUSCODE
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

// Codificamos las operaciones que se podran realizar con relacion a los usuarios
const createUser = async (req, res, next) => {
  try {
    const newUser = new User();
    newUser.name = req.body.name;
    newUser.emoji = req.body.emoji;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.favPalettes = [];

    //Pnt. mejora: comprobar si el user existe antes de guardar
    
    const userDb = await newUser.save();
    
    //Pnt. mejora: autenticar directamente al usuario

    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: null
    });
  } catch (err) {
    return next(err);
  }
}

const authenticate = async (req, res, next) => {
  try {
    //Buscamos al user en bd
    const userInfo = await User.findOne({ email: req.body.email })
    //Comparamos la contraseña
    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
      //eliminamos la contraseña del usuario
      userInfo.password = null
      //creamos el token con el id y el name del user
      const token = jwt.sign(
        {
          id: userInfo._id,
          name: userInfo.name
        },
        req.app.get("secretKey"),
        { expiresIn: "1h" }
      );
      //devolvemos el usuario y el token.
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { user: userInfo, token: token },
      });
    } else {
      return res.json({ status: 400, message: HTTPSTATUSCODE[400], data: null });
    }
  } catch (err) {
    return next(err);
  }
}
//funcion logout, iguala el token a null.
const logout = (req, res, next) => {
  try {
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      token: null
    });
  } catch (err) {
    return next(err)
  }
}

const getAllUsers = async (req, res, next) => {
  try {
    if (req.query.page) { //Se le añade paginación
      const page = parseInt(req.query.page);
      const skip = (page - 1) * 20;
      const users = await User.find().skip(skip).limit(20);
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { users: users },
      });
    } else {
      const users = await User.find();
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { users: users },
      });
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createUser,
  authenticate,
  logout,
  getAllUsers
}