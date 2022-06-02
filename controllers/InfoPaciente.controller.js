const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const putUpdatePaciente = async (req,res) => {
    //res.send(req.body)
    const {id_paciente, tipo_id, identificacion,nombre, apellido, direccion, ciudad, telefono, correo, edad, nacimiento} = req.body
    const update = await prisma.paciente.update({
        where: {
            id_paciente: id_paciente
        },
        data: {
            tipo_id: tipo_id,
            identificacion: identificacion,
            nombre: nombre,
            apellido: apellido,
            direccion: direccion,
            ciudad: ciudad,
            telefono: telefono,
            correo: correo,
            edad: parseInt(edad),
            nacimiento: new Date(nacimiento).toISOString()
        }
    })

    console.log(update)
    return res.json(update)
}

const putCreatePaciente = async (req,res) => {
    const {id_paciente, tipo_id, identificacion, nombre, apellido, direccion, ciudad, telefono, nacimiento, edad, email } = req.body
    const create = await prisma.paciente.create({
        data: {
            id_paciente: id_paciente,
            tipo_id: tipo_id,
            identificacion: identificacion,
            nombre: nombre,
            apellido: apellido,
            direccion: direccion,
            ciudad: ciudad,
            telefono: telefono,
            edad: parseInt(edad),
            nacimiento: new Date(nacimiento).toISOString(),
            correo: email
        }
    })
    return res.json(create)
}

const getPaciente = async (req,res) => {
    console.log('Llegaron estos datos')
    console.log(req.body)
    const {id_paciente} = req.body
    const resultado = await prisma.paciente.findUnique({
        where: {
            id_paciente: id_paciente
        }
    })
    console.log(resultado)
    return res.json(resultado)
}

const getPacientes = async (req, res) => {
    console.log('Se imprimiran todos los pacientes registrados')
    const paciente = await prisma.paciente.findMany({
      select: {
          tipo_id: true,
          identificacion: true,
          nombre: true,
          apellido: true,
          correo: true
      }
    })
    // console.log(paciente)
    return paciente.json()
}


const getMedicos = async (req, res) => {
  console.log('Se imprimiran todos los medicos registrados')
  const medicos = await prisma.medicos.findMany({
    select: {
        tipo_id: true,
        identificacion: true,
        nombre: true,
        correo: true
    }
    })
    console.log(medicos)
    return res.json(medicos)   
}

module.exports = {
    putUpdatePaciente,
    putCreatePaciente,
    getPaciente,
    getPacientes,
    getMedicos
}