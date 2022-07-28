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

const getCitasIntervalos = async (req, res) => {
    const fechas = req.body.fechas_reg
    const fechaInicial = new Date(fechas[0])
    const fechaFinal = new Date(fechas[1])

    const resultado = await prisma.citas.groupBy({
        by: ['id_tipocita'],
        where: {
            fecha: {
                lte: fechaFinal,
                gte: fechaInicial,
              },
        },
        _count: {
            id_tipocita: true, 
        },
    })

    console.log(resultado)
    return res.json(resultado)
}

const getTipoCitas = async (req, res) => {
    const resultado = await prisma.tipocita.findMany()
    return res.json(resultado)
}

const getFreDoc = async (req, res) => {
    const resultado = await prisma.citas.groupBy({
        by: ['id_trabajador'],
        _count: {
            id_trabajador: true, 
        },
    })

    console.log(resultado)
    return res.json(resultado)
}

const getNomDoc = async (req, res) => {
    const resultado = await prisma.trabajador.findMany()
    return res.json(resultado)
}

const getHorasCit = async (req, res) => {
    const resultado = await prisma.citas.groupBy({
        by: ['hora_entrada'],
        _count: {
            hora_entrada: true, 
        },
    })

    console.log(resultado)
    return res.json(resultado)
}

module.exports = {
    putCreateAdmin,
    putUpdateAdmin,
    getAdmin,
    getPacientes,
    getAdmins,
    getMedicos,
    getCitasIntervalos,
    getTipoCitas,
    getFreDoc,
    getNomDoc,
    getHorasCit
}