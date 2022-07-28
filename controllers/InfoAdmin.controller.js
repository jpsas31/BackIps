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
                    gte: new Date(req.body.fechaInicial).toISOString(),
                    lt: new Date(req.body.fechaFinal).toISOString()
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
                gte: new Date(req.body.fechaInicial).toISOString(),
                lt: new Date(req.body.fechaFinal).toISOString()
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

const getCitasMedio = async(req,res) => {
    console.log('Llega esto')
    console.log(req.body)
    const FInicio = new Date(req.body.FInicio)
    const FFinal = new Date(req.body.FFinal)
    const allCitas = await prisma.citas.groupBy({
        by: [ 'id_mediocita' ],
        where: {
            fecha: {
              lte: FFinal,
              gte: FInicio
            }
        },
        _count: {
            id_mediocita: true,
        }

    })

    const tipoMedio = await prisma.mediocita.findMany({
        select: {
            id_mediocita:true,
            medio:true
        }
    })

    const labels = []
    const values = []
    const result = { labels: '', values: ''}

    for (let i = 0; i < tipoMedio.length; i++){
        labels.push(tipoMedio[i].medio)
        values.push(0)
        for(let j = 0; j < allCitas.length; j++){
            console.log()
            if (tipoMedio[i].id_mediocita == allCitas[j].id_mediocita){
                values[i] = allCitas[j]._count.id_mediocita
            }
        }
    }

    result.labels = labels
    result.values = values

    console.log(result)

    return res.json(result)
}


const getCitasEspecialidad = async(req,res) => {
    console.log('Llega esto')
    console.log(req.body)
    const FInicio = new Date(req.body.FInicio)
    const FFinal = new Date(req.body.FFinal)
    const allCitas = await prisma.citas.groupBy({
        by: [ 'id_tipocita' ],
        where: {
            fecha: {
              lte: FFinal,
              gte: FInicio
            }
        },
        _count: {
            id_tipocita: true,
        }

    })

    const tipoCita = await prisma.tipocita.findMany({
        select: {
            id_tipocita:true,
            tipo:true
        }
    })

    console.log(allCitas)

    const labels = []
    const values = []
    const result = { labels: '', values: ''}

    for (let i = 0; i < tipoCita.length; i++){
        labels.push(tipoCita[i].tipo)
        values.push(0)
        for(let j = 0; j < allCitas.length; j++){
            console.log()
            if (tipoCita[i].id_tipocita == allCitas[j].id_tipocita){
                values[i] = allCitas[j]._count.id_tipocita
            }
        }
    }

    result.labels = labels
    result.values = values

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
    getCitasIntervalos,
    getTipoCitas,
    getFreDoc,
    getNomDoc,
    getHorasCit,
    getPacientesxCitaChart,
    getCumple,
    getCitasEspecialidad,
    getCitasMedio
}