var express = require('express');
var router = express.Router();

const {
    getAll
  } = require ("../controllers/Entradas.controller");

const { checkJwt } = require("../middleware/check-jwt.middleware");
  
const Entradas = express.Router();

Entradas.post('/getHTML', checkJwt, async(req, res) => {
    const response = getAll(req, res); 
  })

module.exports = { Entradas };