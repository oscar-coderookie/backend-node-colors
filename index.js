const express = require("express");
const logger = require("morgan");
const HTTPSTATUSCODE = require("./app/utils/httpStatusCode");
const { connect } = require("./app/config/database");
const users = require("./app/api/routes/user.routes");
const colors = require("./app/api/routes/color.routes");
const palettes = require("./app/api/routes/palette.routes");
const cors = require("cors");


connect();

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

  
//morgan to see requests:
app.use(logger("dev"));

app.use("/colors", colors);
app.use("/users", users);
app.use("/palettes", palettes);

// handle errors
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.message || 'Unexpected error');
  })

// to read JSON requests:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("secretKey", "nodeRestApi");

app.use((req, res, next) => {
    let err = new Error();
    err.status = 404;
    err.message = HTTPSTATUSCODE[404];
    next(err);
  });

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:4200"],
    credentials: true,
  })
);

app.disable('x-powered-by');

app.listen(3000, () => {
  console.log("Node server listening on port 3000");
});
