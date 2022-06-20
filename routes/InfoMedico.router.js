var express = require('express');
var router = express.Router();
const {
  putCreateMedico,
  putUpdateMedico,
  getMedico,
  getMedicoID,
  putCreateHM
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

InfoMedicoRouter.post('/getmedico', checkJwt, async (req, res) => {
  const response = getMedicoID(req,res);
})

InfoMedicoRouter.put('/registrar-hm', checkJwt, async (req, res) => {
  const response = putCreateHM(req,res);
})

module.exports = { InfoMedicoRouter };
