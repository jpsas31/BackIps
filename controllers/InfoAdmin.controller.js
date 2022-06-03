const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const putCreateAdmin = async (req,res) => {
    const {id_trabajador, tipo_id, identificacion, nombre, apellido, direccion,telefono, correo} = req.body
    console.log(req.body)
    // const idTrabajador = '625'
    const create = await prisma.trabajador.create({
        data: {
            id_trabajador: id_trabajador,
            tipo_id_cargo: 1,
            tipo_id: tipo_id,
            identificacion: identificacion,
            nombre: nombre,
            apellido: apellido,
            direccion: direccion,
            telefono: telefono,
            correo: correo,
            salario: 3000000
        }
    }) 

    console.log(create)
    return res.json(create)
}

module.exports = {
    putCreateAdmin
}