var express = require('express');
var router = express.Router();

const {
    getAll,
    getAll2
  } = require ("../controllers/Entradas.controller");

const { checkJwt } = require("../middleware/check-jwt.middleware");
  
const Entradas = express.Router();

Entradas.post('/getHTML', checkJwt, async(req, res) => {
    const response = getAll(req, res); 
  })

Entradas.post('/getCertificado', checkJwt, async(req, res) => {
  const response = getAll2(req, res); 
})

module.exports = { Entradas };