
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const putUpdatePaciente = async (req,res) => {
    console.log(req.body)
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
    const {id_paciente, tipo_id, identificacion, nombre, apellido, direccion, ciudad, telefono, correo, edad, nacimiento } = req.body
    console.log(req.body)
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
            correo: correo,
            edad: parseInt(edad),
            nacimiento: new Date(nacimiento).toISOString()
        }
    })
    await prisma.usuarios.create({
            data:{
                id_usuario: id_paciente,
                tipo_usuario: 'paciente',        
                estado: true
            }
        })
    
    console.log(create)
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
    const paciente = await prisma.pacientesusuarios.findMany({
    select: {
        id_usuario: true,
        tipo_id: true,
        identificacion: true,
        nombre: true,
        apellido: true,
        direccion: true,
        telefono: true,
        correo: true,
        edad: true,
        rol: true,
        estado: true
    }
    })
    // console.log(paciente)
    return res.json(paciente)
}

const getTrabajadores = async (req, res) => {
  console.log('Se imprimiran todos los trabajadores registrados')
  const trabajadores = await prisma.trabajadorusuarios.findMany({
    select: {
        id_usuario: true,
        rol: true,
        tipo_id: true,
        identificacion: true,
        nombre: true,
        apellido: true,
        direccion: true,
        telefono: true,
        correo: true,
        estado: true
    }
    })
    return res.json(trabajadores)
}

const cambEstUsuario = async (req, res) => {
    console.log('Se cambiara el estado')
    const {id_usuario, estado} = req.body
    const update = await prisma.usuarios.updateMany({
        where: {
            id_usuario: id_usuario
        },
        data: {
            estado: estado
        }
    })
    return res.json(update)
}

const getPacientePorId = async (req,res) => {
    console.log('Llegaron estos datos')
    console.log(req.body.id_paciente)
    const {tipo_id, identificacion} = req.body.id_paciente
    const resultado = await prisma.paciente.findMany({
        where: {
            tipo_id: tipo_id,
            identificacion: String(identificacion)
        }
    })
    console.log(resultado)
    return res.json(resultado)
}

const getHM = async (req,res) => {
    console.log('Llegaron estas historias clinicas')
    const { id_paciente } = req.body.id_paciente
    const resultado = await prisma.entradashm.findMany({
        where: {
            id_paciente: id_paciente
        },
        select: {
            id_entrada: true,
            id_paciente: true,
            id_formula: true,
            descripcion: true,
            fecha:true,
            formula: true,
            trabajador: true
        }
    })
    console.log(resultado)
    return res.json(resultado)
}

const getInfoHM = async (req, res) => {
    console.log('Llego esta informacion')
    const { id_entrada } = req.body.id_entrada
    const resultado = await prisma.entradashm.findMany({
        where: {
            id_entrada: id_entrada
        },
        select: {
            id_entrada: true,
            id_paciente: true,
            id_formula: true,
            descripcion: true,
            fecha: true,
            formula: true,
            trabajador: true,
            paciente: true

        }
    })
    console.log(resultado)
    return res.json(resultado)
}

module.exports = {
    putUpdatePaciente,
    putCreatePaciente,
    getPaciente,
    getPacientes,
    getTrabajadores,
    cambEstUsuario,
    getPacientePorId,
    getHM,
    getInfoHM
}