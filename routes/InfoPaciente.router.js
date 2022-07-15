var express = require('express');
var router = express.Router();
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const {
  putUpdatePaciente,
  getPaciente,
  putCreatePaciente,
  getPacientes,
  getTrabajadores,
  cambEstUsuario,
  putCreateCita,
  getCitasByMedico,
  getPacientePorId,
  getHM,
  getInfoHM,
  getMedioCita,
  getPacienteAUTH
  getAntecedente
} = require ("../controllers/InfoPaciente.controller");
const { checkJwt } = require("../middleware/check-jwt.middleware");

const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, '../Antecedentes'),
  filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
  }
})

const fileUpload = multer({ storage: diskstorage }); //10MB


const InfoPacienteRouter = express.Router();

InfoPacienteRouter.put('/actualizar-paciente', checkJwt , async (req, res) => {
  const response = putUpdatePaciente(req,res);
});

InfoPacienteRouter.post('/infopaciente', checkJwt , async (req, res) => {
  const response = getPaciente(req,res);
});

InfoPacienteRouter.put('/registrar-paciente', checkJwt, async (req, res) => {
  const response = putCreatePaciente(req,res);
})

InfoPacienteRouter.post('/consultar-pacientes', checkJwt, async(req, res) => {
  const response = getPacientes(req, res);
})

InfoPacienteRouter.post('/consultar-trabajadores', checkJwt, async(req, res) => {
  const response = getTrabajadores(req, res);
})

InfoPacienteRouter.put('/cambEst-usuario', checkJwt, async(req, res) => {
  const response = cambEstUsuario(req, res);
})

InfoPacienteRouter.put('/crear-cita', checkJwt, async(req, res) => {
  const response = putCreateCita(req, res);
})

InfoPacienteRouter.post('/consultar-citasByMedico', checkJwt, async(req, res) => {
  const response = getCitasByMedico(req, res);
})
  
InfoPacienteRouter.post('/consultar-paciente-porid', checkJwt , async (req, res) => {
  const response = getPacientePorId(req,res);
})

InfoPacienteRouter.post('/getHM', checkJwt, async(req, res) => {
  const response = getHM(req, res);
})

InfoPacienteRouter.post('/getInfoHM', checkJwt, async(req, res) => {
  const response = getInfoHM(req, res);
})

InfoPacienteRouter.post('/consultar-citamedio', checkJwt, async(req, res) => {
  const response = getMedioCita(req, res);
})

InfoPacienteRouter.post('/getpacienteporAUTH', checkJwt, async(req, res) => {
  const response = getPacienteAUTH(req, res); 
})

InfoPacienteRouter.post('/subir-archivo', checkJwt, fileUpload.single('archivo'), async (req, res) => {
  console.log(req.file)
  const nombre = req.file.filename
  const data = fs.readFileSync(path.join(__dirname, '../Antecedentes/' + req.file.filename))
  const update = await prisma.paciente.update({
    where: {
        id_paciente: req.auth.sub
    },
    data: {
      antecedentes: nombre
    }
  })

  console.log(update)
  return res.json(update)
})

InfoPacienteRouter.post('/consultar-antecedente', checkJwt, async(req, res) => {
  const response = getAntecedente(req, res);
})


module.exports = { InfoPacienteRouter };
