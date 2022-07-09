var express = require('express');
var router = express.Router();
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const {
  putCreateMedico,
  putUpdateMedico,
  getMedico,
  getMedicosByEspecialidad,
  getCitaByEspecialidad,
  getTurnosByMedico,
  getMedicoID,
  putCreateHM,
  getCertificado
} = require ("../controllers/InfoMedico.controller");
const { checkJwt } = require("../middleware/check-jwt.middleware");

const InfoMedicoRouter = express.Router();

const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, '../Certificados'),
  filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
  }
})

const fileUpload = multer({ storage: diskstorage }); //10MB

InfoMedicoRouter.put('/registrar-medico', checkJwt, async (req, res) => {
  const response = putCreateMedico(req,res);
})

InfoMedicoRouter.put('/actualizar-medico', checkJwt, async (req, res) => {
  const response = putUpdateMedico(req,res);
});

InfoMedicoRouter.post('/infomedico', checkJwt, async (req, res) => {
  const response = getMedico(req,res);
});

InfoMedicoRouter.post('/infomedico-byespecialidad', checkJwt, async (req, res) => {
  const response = getMedicosByEspecialidad(req,res);
});

InfoMedicoRouter.post('/infocita-byespecialidad', checkJwt, async (req, res) => {
  const response = getCitaByEspecialidad(req,res);
});

InfoMedicoRouter.post('/infoturno-bymedico', checkJwt, async (req, res) => {
  const response = getTurnosByMedico(req,res);
});

InfoMedicoRouter.post('/getmedico', checkJwt, async (req, res) => {
  const response = getMedicoID(req,res);
})

InfoMedicoRouter.put('/registrar-hm', checkJwt, async (req, res) => {
  const response = putCreateHM(req,res);
})

InfoMedicoRouter.post('/subir-archivo', checkJwt, fileUpload.single('archivo'), async (req, res) => {
  console.log(req.file)
  const nombre = req.file.filename
  const data = fs.readFileSync(path.join(__dirname, '../Certificados/' + req.file.filename))
  const update = await prisma.medicos.update({
    where: {
        id_trabajador: req.auth.sub
    },
    data: {
      certificacion_del_titulo: nombre
    }
  })

  console.log(update)
  return res.json(update)
})

InfoMedicoRouter.post('/consultar-certificado', checkJwt, async(req, res) => {
  const response = getCertificado(req, res);
})

module.exports = { InfoMedicoRouter };
