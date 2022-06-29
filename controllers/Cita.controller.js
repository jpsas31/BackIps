
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const moment = require('moment-timezone');


const getCita = async (req,res) =>{
    const Cita = await prisma.citas.findMany({where:{
        // id_paciente:'auth0|62aca1f60a2a96cd305d9c4d'
        id_paciente: req.body.id_paciente
    }})
    const tipoCitas = await prisma.tipocita.findMany()
    const medio= await prisma.mediocita.findMany()
    
    let today = new Date();
    let horaToday= today.toLocaleTimeString();
    let CitaCalendar=[]
    for (let i=0; i<Cita.length; i++){
        
        let hora_salida = moment(Cita[i].hora_salida).utc().format("LT")
        let hora_entrada =  moment(Cita[i].hora_entrada).utc().format("LT")
        let month = Cita[i].fecha.getUTCMonth() + 1; //months from 1-12
        let day = Cita[i].fecha.getUTCDate();
        let year = Cita[i].fecha.getUTCFullYear();
        let fecha=year + "/" + month + "/" + day;
        today=moment(today).format('YYYYMMDD')
        console.log(fecha,today)
        console.log(fecha<today)
        console.log(fecha>today)

        if(fecha>today && horaToday < hora_salida){
            // Cita[i].fecha<today cambiar
             continue
        }
        CitaCalendar.push({
            id:Cita[i].id_cita,
            tipoCita:tipoCitas[Cita[i].id_tipocita-1].tipo,
            Precio:tipoCitas[Cita[i].id_tipocita-1].precio + medio[Cita[i].id_mediocita-1].precio,
            horaEntrada: hora_entrada,
            medio: medio[Cita[i].id_mediocita-1].medio,
            horaSalida: hora_salida,
            fecha:fecha,
           
        })

    }
    console.log(CitaCalendar)
    return res.json(CitaCalendar)
    
}

const putDeleteCita = async (req,res) =>{
    console.log(req.body)
    const cita = req.body.datos.map(str => {
        return Number(str);
      });
    await prisma.citamedicos.deleteMany({
                    where: { id_cita: {in:cita} },
    })

    return res.status(200).json({message:"Completado"})
}


module.exports = {
  getCita,
  putDeleteCita
}
