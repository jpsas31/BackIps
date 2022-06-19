const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const putUpdateMedico = async (req,res) => {
    //res.send(req.body)
    const {id_trabajador, tipo_id_cargo, identificacion, tipo_id, nombre, apellido, direccion, telefono, correo, salario, id_especialidad, certificacion_del_titulo} = req.body
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
            medicos: {
                update: {
                    id_especialidad: parseInt(id_especialidad),
                    certificacion_del_titulo: certificacion_del_titulo,
                },
            },
        },
        include : {medicos: true},
    })

    console.log(update)
    return res.json(update)
}

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

    ).then(async () => {
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

const getMedico = async (req, res) => {
    console.log('Llegaron estos datos')
    console.log(req.body)
    const id_trabajador = req.body.id_trabajador
    const resultado = await prisma.trabajador.findUnique({
        where: {
            id_trabajador: id_trabajador
        },
        include: {
            medicos: true
        },
    })
    console.log(resultado)
    return res.json(resultado)
}

const getMedicosByEspecialidad = async (req,res) => {
    console.log('Llegaron estos datos')
    console.log(req.body)
    const {id_especialidad} = req.body
    const resultado = await prisma.medicos.findMany({
        where: {
            id_especialidad: parseInt(id_especialidad)
        },
        include: {
            trabajador: true,
        }, 
    })
    console.log(resultado)
    return res.json(resultado)
}

const getCitaByEspecialidad = async (req,res) => {
    console.log('Llegaron estos datos')
    console.log(req.body)
    const {id_especialidad} = req.body
    const resultado = await prisma.tipocita.findUnique({
        where: {
            id_tipocita: parseInt(id_especialidad)
        }
    })
    console.log(resultado)
    return res.json(resultado)
}

const getTurnosByMedico = async (req,res) => {
    console.log('Llegaron estos datos')
    console.log(req.body)
    const {id_trabajador} = req.body
    console.log(id_trabajador)
    const resultado = await prisma.turnosmedicos.findMany({
        where: {
            id_trabajador: id_trabajador
        }
    })
    console.log(resultado)
    return res.json(resultado)
}

module.exports = {
    putCreateMedico,
    putUpdateMedico,
    getMedico,
    getMedicosByEspecialidad,
    getCitaByEspecialidad,
    getTurnosByMedico
}