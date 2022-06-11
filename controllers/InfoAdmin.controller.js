const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const putUpdateAdmin = async (req,res) => {
    //res.send(req.body)
    const {id_trabajador, tipo_id_cargo, identificacion, tipo_id, nombre, apellido, direccion, telefono, correo, salario} = req.body
    const update = await prisma.trabajador.update({
        where: {
            id_trabajador: id_trabajador
        },
        data: {
            tipo_id_cargo: parseInt(tipo_id_cargo),
            identificacion: identificacion,
            tipo_id: tipo_id,
            nombre: nombre,
            apellido: apellido,
            direccion: direccion,
            telefono: telefono,
            correo: correo,
            salario: parseInt(salario),
        }
    })

    console.log(update)
    return res.json(update)
}

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
    }).then(async () => {
        await prisma.usuarios.create({
            data:{
                id_usuario: id_trabajador,
                tipo_usuario: 'trabajador',        
                estado: true
            }
        })
    })

    console.log(create)
    return res.json(create)
}

const getAdmin = async (req,res) => {
    console.log('Llegaron estos datos')
    console.log(req.body)
    const {id_trabajador} = req.body
    const resultado = await prisma.trabajador.findUnique({
        where: {
            id_trabajador: id_trabajador
        }
    })
    console.log(resultado)
    return res.json(resultado)
}

module.exports = {
    putCreateAdmin,
    putUpdateAdmin,
    getAdmin
}