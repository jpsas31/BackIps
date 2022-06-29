var express = require('express');
var router = express.Router();
const {
  getCita,
  putDeleteCita
} = require ("../controllers/Cita.controller");
const { checkJwt } = require("../middleware/check-jwt.middleware");

const CitaRouter = express.Router();

// CitaRouter.put('/actualizar-Cita', checkJwt , async (req, res) => {
//   const response = putUpdateCita(req,res);
// });

CitaRouter.post('/get-Cita', checkJwt , async (req, res) => {
 
  const response = getCita(req,res);
});

// CitaRouter.put('/registrar-Cita', checkJwt, async (req, res) => {
//   console.log("entro")
//   const response = putCreateCita(req,res);
// })
CitaRouter.put('/borrar-Cita', checkJwt, async (req, res) => {
  const response = putDeleteCita(req,res);
})

module.exports = { CitaRouter };

