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
const { messagesRouter } = require("./routes/messages.router");
const { InfoPacienteRouter } = require("./routes/InfoPaciente.router");
const { InfoMedicoRouter } = require("./routes/InfoMedico.router");

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

apiRouter.use('/messages',messagesRouter)

apiRouter.use('/info-paciente',InfoPacienteRouter)

apiRouter.use('/info-medico',InfoMedicoRouter)

// errores 404
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(errorHandler);
app.use(notFoundHandler);

module.exports = app;
