var express = require('express');
var router = express.Router();
const {
  putUpdatePaciente,
  getPaciente,
  putCreatePaciente,
  getUsuarios
} = require ("../controllers/InfoPaciente.controller");
const { checkJwt } = require("../middleware/check-jwt.middleware");

const InfoPacienteRouter = express.Router();

InfoPacienteRouter.put('/actualizar-paciente', checkJwt , async (req, res) => {
  const response = putUpdatePaciente(req,res);
});

InfoPacienteRouter.post('/infopaciente', checkJwt , async (req, res) => {
  const response = getPaciente(req,res);
});

InfoPacienteRouter.put('/registrar-paciente', checkJwt, async (req, res) => {
  const response = putCreatePaciente(req,res);
})

InfoPacienteRouter.get('/consultar-usuarios', checkJwt, async(req, res) => {
  const response = getUsuarios(req, res);
})


module.exports = { InfoPacienteRouter };
