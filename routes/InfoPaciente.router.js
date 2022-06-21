var express = require('express');
var router = express.Router();
const {
  putUpdatePaciente,
  getPaciente,
  putCreatePaciente,
  getPacientes,
  getTrabajadores,
  cambEstUsuario,
  getPacientePorId,
  getHM,
  getInfoHM
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

InfoPacienteRouter.post('/consultar-pacientes', checkJwt, async(req, res) => {
  const response = getPacientes(req, res);
})

InfoPacienteRouter.post('/consultar-trabajadores', checkJwt, async(req, res) => {
  const response = getTrabajadores(req, res);
})

InfoPacienteRouter.put('/cambEst-usuario', checkJwt, async(req, res) => {
  const response = cambEstUsuario(req, res);
})

InfoPacienteRouter.post('/consultar-paciente-porid', checkJwt , async (req, res) => {
  const response = getPacientePorId(req,res);
});

InfoPacienteRouter.post('/getHM', checkJwt, async(req, res) => {
  const response = getHM(req, res);
})

InfoPacienteRouter.post('/getInfoHM', checkJwt, async(req, res) => {
  const response = getInfoHM(req, res);
})

module.exports = { InfoPacienteRouter };

