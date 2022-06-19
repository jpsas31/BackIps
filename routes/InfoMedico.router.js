var express = require('express');
var router = express.Router();
const {
  putCreateMedico,
  putUpdateMedico,
  getMedico,
  getMedicosByEspecialidad,
  getCitaByEspecialidad,
  getTurnosByMedico
} = require ("../controllers/InfoMedico.controller");
const { checkJwt } = require("../middleware/check-jwt.middleware");

const InfoMedicoRouter = express.Router();

InfoMedicoRouter.put('/registrar-medico', checkJwt, async (req, res) => {
  const response = putCreateMedico(req,res);
})

InfoMedicoRouter.put('/actualizar-medico', checkJwt, async (req, res) => {
  const response = putUpdateMedico(req,res);
});

InfoMedicoRouter.post('/infomedico', checkJwt, async (req, res) => {
  const response = getMedico(req,res);
});

InfoMedicoRouter.post('/infomedico-byespecialidad', checkJwt, async (req, res) => {
  const response = getMedicosByEspecialidad(req,res);
});

InfoMedicoRouter.post('/infocita-byespecialidad', checkJwt, async (req, res) => {
  const response = getCitaByEspecialidad(req,res);
});

InfoMedicoRouter.post('/infoturno-bymedico', checkJwt, async (req, res) => {
  const response = getTurnosByMedico(req,res);
});

module.exports = { InfoMedicoRouter };
