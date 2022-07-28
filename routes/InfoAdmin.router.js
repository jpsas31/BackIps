var express = require('express');
var router = express.Router();
const {
  putCreateAdmin,
  putUpdateAdmin,
  getAdmin,
  getPacientes,
  getAdmins,
  getMedicos,
  getCitasIntervalos,
  getTipoCitas,
  getFreDoc,
  getNomDoc,
  getHorasCit,
  getPacientesxCitaChart,
  getCumple
  getCitasEspecialidad,
  getCitasMedio
} = require ("../controllers/InfoAdmin.controller");

const { checkJwt } = require("../middleware/check-jwt.middleware");

const InfoAdminRouter = express.Router();

InfoAdminRouter.put('/registrar-admin', checkJwt, async (req, res) => {
  const response = putCreateAdmin(req,res);
})

InfoAdminRouter.put('/actualizar-admin', checkJwt, async (req, res) => {
  const response = putUpdateAdmin(req,res);
});

InfoAdminRouter.post('/infoadmin', checkJwt, async (req, res) => {
  const response = getAdmin(req,res);
});

InfoAdminRouter.post('/listPacientes', checkJwt, async (req, res) => {
  const response = getPacientes(req,res);
});

InfoAdminRouter.post('/listAdmins', checkJwt, async (req, res) => {
  const response = getAdmins(req,res);
});

InfoAdminRouter.post('/listMedicos', checkJwt, async (req, res) => {
  const response = getMedicos(req,res);
});

InfoAdminRouter.post('/citasIntervalos', checkJwt, async (req, res) => {
  const response = getCitasIntervalos(req, res);
})

InfoAdminRouter.post('/tipoCitas', checkJwt, async (req, res) => {
  const response = getTipoCitas(req, res);
})

InfoAdminRouter.post('/getFreDoc', checkJwt, async (req, res) => {
  const response = getFreDoc(req, res);
})

InfoAdminRouter.post('/nombDoc', checkJwt, async (req, res) => {
  const response = getNomDoc(req, res);
})

InfoAdminRouter.post('/horasCit', checkJwt, async (req, res) => {
  const response = getHorasCit(req, res);
})

InfoAdminRouter.post('/pacientesxcitachart', checkJwt, async (req, res) => {
  const response = getPacientesxCitaChart(req,res);
});

InfoAdminRouter.post('/cumple', checkJwt, async (req, res) => {
  const response = getCumple(req,res);
});

InfoAdminRouter.post('/citasMedios', checkJwt, async (req, res) => {
  const response = getCitasMedio(req,res);
});

InfoAdminRouter.post('/citasEspecialidad', checkJwt, async (req, res) => {
  const response = getCitasEspecialidad(req,res);
});

module.exports = { InfoAdminRouter };
