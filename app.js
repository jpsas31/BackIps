const dotenv = require("dotenv");
const express = require("express");
const helmet = require("helmet");
const nocache = require("nocache");;
const { errorHandler } = require("./middleware/error.middleware");
const { notFoundHandler } = require("./middleware/not-found.middleware");
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors')
const { authUserRouter } = require("./routes/Auth.router");
const { InfoPacienteRouter } = require("./routes/InfoPaciente.router");
const { InfoMedicoRouter } = require("./routes/InfoMedico.router");
const { InfoAdminRouter } = require("./routes/InfoAdmin.router");
const {TurnosRouter} = require("./routes/Turnos.router")
const {CitaRouter} = require("./routes/Citas.router")
const {CalendarRouter} = require("./routes/Calendar.router")
const {Entradas} = require("./routes/Entradas.router")

const apiRouter = express.Router();
const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;

var app = express();


dotenv.config();
app.use(
  helmet({
    hsts: {
      maxAge: 31536000,
    },
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'none'"],
        "frame-ancestors": ["'none'"],
      },
    },
    frameguard: {
      action: "deny",
    },
  })
);

app.use((req, res, next) => {
  res.contentType("application/json; charset=utf-8");
  next();
});
app.use(nocache());

app.use(
  cors()
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api",apiRouter)


apiRouter.use('/auth',authUserRouter)

apiRouter.use('/info-paciente',InfoPacienteRouter)

apiRouter.use('/info-medico',InfoMedicoRouter)

apiRouter.use('/info-admin',InfoAdminRouter)

apiRouter.use('/info-turnos',TurnosRouter)
apiRouter.use('/info-cita',CitaRouter)
apiRouter.use('/calendar',CalendarRouter)
apiRouter.use('/info-entradas',Entradas)
// errores 404
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(errorHandler);
app.use(notFoundHandler);

module.exports = app;
