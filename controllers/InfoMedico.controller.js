const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const putCreateMedico = async (req,res) => {
    const {id_trabajador,id_especialidad, tipo_id, identificacion, nombre, apellido, direccion,telefono, correo} = req.body
    const create = await prisma.trabajador.create({
        data: {
            id_trabajador: id_trabajador,
            tipo_id_cargo: 2,
            tipo_id: tipo_id,
            identificacion: identificacion,
            nombre: nombre,
            apellido: apellido,
            direccion: direccion,
            telefono: telefono,
            correo: correo,
            salario: 0
        }
    }).then( async  () => {
        await prisma.medicos.create({
            data: {
                id_trabajador: id_trabajador,
                id_especialidad: parseInt(id_especialidad),
                certificacion_del_titulo: '/1193552015'
            }
        })

    }

    )

    console.log(create)
    return res.json(create)
}

module.exports = {
    putCreateMedico
}