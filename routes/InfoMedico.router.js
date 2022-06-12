var express = require('express');
var router = express.Router();
const {
  putCreateMedico,
  putUpdateMedico,
  getMedico
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

module.exports = { InfoMedicoRouter };
