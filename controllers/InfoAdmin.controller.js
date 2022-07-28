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
    getCitasEspecialidad,
    getCitasMedio
}