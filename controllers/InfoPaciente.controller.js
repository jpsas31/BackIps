const {PrismaClient, Prisma} = require('@prisma/client')
const prisma = new PrismaClient()


const putUpdatePaciente = async (req,res) => {
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
            nacimiento: new Date(nacimiento)
        }
    })

    console.log(update)
    return res.json(update)
}

const getPaciente = async (req,res) => {
    const {id_paciente} = req.body
    const resultado = await prisma.paciente.findUnique({
        where: {
            id_paciente: id_paciente
        }
    })
    console.log(resultado)
    return res.json(resultado)
}

const putUpdatePw = async (req,res) => {
    const {id_usuario, tipo_usuario, clave, nuevaClave, nuevaClave2} = req.body
    const get = await prisma.usuarios.findUnique({
        where: {
            id_usuario_tipo_usuario: {
                id_usuario: id_usuario,
                tipo_usuario: tipo_usuario
            }
        }
    })

    if (get.clave === clave && nuevaClave === nuevaClave2) {
        const update = await prisma.usuarios.update({
            where: {
                id_usuario_tipo_usuario: {
                    id_usuario: id_usuario,
                    tipo_usuario: tipo_usuario
                }
            },
            data: {
                clave: nuevaClave
            }
        })
        return res.json({ 'err': 0 })
    } else {
        return res.json({ 'err': 1 })
    }
}

module.exports = {
    putUpdatePaciente,
    getPaciente,
    putUpdatePw,
}