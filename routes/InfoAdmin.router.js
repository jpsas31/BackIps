var express = require('express');
var router = express.Router();
const {
  putCreateAdmin,
  putUpdateAdmin,
  getAdmin,
  getPacientes,
  getAdmins,
  getMedicos
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

module.exports = { InfoAdminRouter };
