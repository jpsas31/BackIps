var express = require('express');
var router = express.Router();
const {
  putUpdateTurno,
  getTurnos,
  putCreateTurno,
  putDeleteTurno
} = require ("../controllers/Turnos.controller");
const { checkJwt } = require("../middleware/check-jwt.middleware");

const TurnosRouter = express.Router();

TurnosRouter.put('/actualizar-turno', checkJwt , async (req, res) => {
  const response = putUpdateTurno(req,res);
});

TurnosRouter.post('/get-turnos', checkJwt , async (req, res) => {
 
  const response = getTurnos(req,res);
});

TurnosRouter.put('/registrar-turnos', checkJwt, async (req, res) => {
  console.log("entro")
  const response = putCreateTurno(req,res);
})
TurnosRouter.put('/borrar-turnos', checkJwt, async (req, res) => {
  const response = putDeleteTurno(req,res);
})

module.exports = { TurnosRouter };

