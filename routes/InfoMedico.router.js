var express = require('express');
var router = express.Router();
const {
  putCreateMedico
} = require ("../controllers/InfoMedico.controller");
const { checkJwt } = require("../middleware/check-jwt.middleware");

const InfoMedicoRouter = express.Router();

InfoMedicoRouter.put('/registrar-medico', checkJwt, async (req, res) => {
  const response = putCreateMedico(req,res);
})

module.exports = { InfoMedicoRouter };
