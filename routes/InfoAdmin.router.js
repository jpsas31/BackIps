var express = require('express');
var router = express.Router();
const {
  putCreateAdmin,
  putUpdateAdmin,
  getAdmin
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

module.exports = { InfoAdminRouter };
