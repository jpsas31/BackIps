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

const getPacientes = async (req,res) => {
    console.log('Llegaron estos datos')
    console.log(req.body)
    const resultado = await prisma.paciente.findMany({
        select: {
            id_paciente: true,
            tipo_id: true,
            identificacion: true,
            nombre: true,
            apellido: true,
            direccion: true,
            ciudad: true,
            telefono: true,
            correo: true,
            edad: true,
            nacimiento: true,
            antecedentes: true,
        }
    })
    console.log(resultado)
    return res.json(resultado)
}

const getAdmins = async (req,res) => {
    console.log('Llegaron estos datos')
    console.log(req.body)
    const resultado = await prisma.trabajador.findMany({
        where: {
            tipo_id_cargo: 1,
        },
        select: {
            id_trabajador: true,
            tipo_id_cargo: true,
            identificacion: true,
            tipo_id: true,
            nombre: true,
            apellido: true,
            direccion: true,
            telefono: true,
            correo: true,
            salario: true,
        }
    })
    console.log(resultado)
    return res.json(resultado)
}

const getMedicos = async (req,res) => {
    console.log('Llegaron estos datos')
    console.log(req.body)
    const resultado = await prisma.trabajador.findMany({
        where: {
            tipo_id_cargo: 2,
        },
        select: {
            id_trabajador: true,
            tipo_id_cargo: true,
            identificacion: true,
            tipo_id: true,
            nombre: true,
            apellido: true,
            direccion: true,
            telefono: true,
            correo: true,
            salario: true,
            medicos: true,
        },
    })

    console.log(resultado)
    return res.json(resultado)
}

const getPacientesxCitaChart = async (req,res) => {
    console.log('Llegaron estos datos')
    console.log(req.body)
    const paciente = await prisma.paciente.findMany({
        where: {
            identificacion: req.body.id,
        },
        select: {
            id_paciente: true
        },
    })

    // console.log(paciente)

    var citas = []
    if (paciente.length > 0) {
        citas = await prisma.citas.groupBy({
            by: ['id_paciente','id_tipocita'],
            where: {
                id_paciente: paciente[0].id_paciente,
                fecha: {
                    gte: new Date(req.body.fecha).toISOString()
                },
            },
            _count: {
                _all: true,
            },
        })
    }


    console.log(citas)
    return res.json(citas)
}

const getCumple = async (req,res) => {
    console.log('Llegaron estos datos')
    console.log(req.body)

    const result = await prisma.paciente.findMany({
        where: {
            nacimiento: {
                gte: new Date(req.body.fecha).toISOString()
            }
        },
        select: {
            id_paciente: true,
            identificacion: true,
            nombre: true,
            apellido: true,
            telefono: true,
            correo: true,
            nacimiento: true,
        }
    })

    console.log(result)
    return res.json(result)
}

module.exports = {
    putCreateAdmin,
    putUpdateAdmin,
    getAdmin,
    getPacientes,
    getAdmins,
    getMedicos,
    getPacientesxCitaChart,
    getCumple
}