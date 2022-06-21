
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const putUpdatePaciente = async (req,res) => {
    console.log(req.body)
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
    const {id_paciente, tipo_id, identificacion, nombre, apellido, direccion, ciudad, telefono, correo, edad, nacimiento } = req.body
    console.log(req.body)
    const create = await prisma.paciente.create({
        data: {
            id_paciente: id_paciente,
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
    await prisma.usuarios.create({
            data:{
                id_usuario: id_paciente,
                tipo_usuario: 'paciente',        
                estado: true
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

const getPacientes = async (req, res) => {
    console.log('Se imprimiran todos los pacientes registrados')
    const paciente = await prisma.pacientesusuarios.findMany({
    select: {
        id_usuario: true,
        tipo_id: true,
        identificacion: true,
        nombre: true,
        apellido: true,
        direccion: true,
        telefono: true,
        correo: true,
        edad: true,
        rol: true,
        estado: true
    }
    })
    // console.log(paciente)
    return res.json(paciente)
}

const getTrabajadores = async (req, res) => {
  console.log('Se imprimiran todos los trabajadores registrados')
  const trabajadores = await prisma.trabajadorusuarios.findMany({
    select: {
        id_usuario: true,
        rol: true,
        tipo_id: true,
        identificacion: true,
        nombre: true,
        apellido: true,
        direccion: true,
        telefono: true,
        correo: true,
        estado: true
    }
    })
    return res.json(trabajadores)
}

const cambEstUsuario = async (req, res) => {
    console.log('Se cambiara el estado')
    const {id_usuario, estado} = req.body
    const update = await prisma.usuarios.updateMany({
        where: {
            id_usuario: id_usuario
        },
        data: {
            estado: estado
        }
    })
    return res.json(update)
}

const putCreateCita = async (req,res) => {
    const {id_tipocita, id_paciente, id_trabajador, hora_entrada, hora_salida, fecha, precio } = req.body
    console.log(req.body)
    hora_entradaML = new Date('2001-09-11'+' '+hora_entrada).getTime() - 18000000
    hora_salidaML = new Date('2001-09-11'+' '+hora_salida).getTime() - 18000000
    const creado = await prisma.citas.create({
        data: {
            id_tipocita: parseInt(id_tipocita),
            id_paciente: id_paciente,
            id_trabajador: id_trabajador, 
            hora_entrada: new Date(hora_entradaML),
            hora_salida: new Date(hora_salidaML),
            fecha: new Date(fecha).toISOString()
        }
    })
    await prisma.factura.create({
        data:{
            id_cita: creado.id_cita,
            total_pagar:precio,
            cantidad_pag: 0,
            fecha_creacion: new Date()
        }

    })
    console.log(creado)
    return res.json(creado)
}

const getCitasByMedico = async (req, res) => {
    console.log('Se imprimiran las citas, segun el medico y la hora')
    const {id_trabajador, fecha} = req.body
    console.log(req.body)
    const resultado = await prisma.citas.findMany({
      where: {
        id_trabajador: id_trabajador,
        fecha: new Date(fecha).toISOString()
      }
      })
      console.log('Buenas lolas chiqui', resultado)
      return res.json(resultado)
  }

module.exports = {
    putUpdatePaciente,
    putCreatePaciente,
    getPaciente,
    getPacientes,
    getTrabajadores,
    cambEstUsuario,
    putCreateCita,
    getCitasByMedico
}