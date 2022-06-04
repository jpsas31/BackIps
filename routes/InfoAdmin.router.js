var express = require('express');
var router = express.Router();
const {
  putCreateAdmin
} = require ("../controllers/InfoAdmin.controller");
const { checkJwt } = require("../middleware/check-jwt.middleware");

const InfoAdminRouter = express.Router();

InfoAdminRouter.put('/registrar-admin', checkJwt, async (req, res) => {
  const response = putCreateAdmin(req,res);
})

module.exports = { InfoAdminRouter };
