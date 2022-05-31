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
    const {tipo_id, identificacion, nombre, apellido, direccion, ciudad, telefono, nacimiento, edad, email } = req.body
    const create = await prisma.paciente.create({
        data: {
            id_paciente: '5',
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

const getUsuarios = async (req, res) => {
    
}

module.exports = {
    putUpdatePaciente,
    putCreatePaciente,
    getPaciente,
}