
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const putUpdateTurno = async (req,res) =>{
    console.log(req.body)
    const { id_turno, id_trabajador, fecha, inicioTurno, finTurno} = req.body
    const update = await prisma.turnosmedicos.update({
        where: {
            id_turno: id_turno
        },
        data:{
            // id_turno,
            id_trabajador, 
            fecha, 
            inicioTurno, 
            finTurno
        }
    })
    return res.json(update)
}


const getTurnos = async (req,res) =>{
    const turnos = await prisma.turnosmedicos.findMany({where:{
        id_trabajador:req.body.id_trabajador
    }})
    let turnosCalendar=[]
    for (let i=0; i<turnos.length; i++){
        turnosCalendar.push({
            id:turnos[i].id_turno,
            title:'Turno',
            start:turnos[i].inicioturno,
            end:turnos[i].finturno
        })

    }
    return res.json(turnosCalendar)
    
}

const putCreateTurno = async (req,res) =>{
    let turnos = req.body
    console.log(turnos)
    let turnosListos=[]
    for (let i=0; i<turnos.length-1; i++){
        turnosListos.push({
            id_turno:turnos[i].id,
            id_trabajador:turnos[turnos.length-1],
            start:turnos[i].start,
            end:turnos[i].end
        })
       

    }
   
    const collection = await prisma.$transaction(
        turnosListos.map(cur =>
          prisma.turnosmedicos.upsert({
            where: { id_turno: parseInt(cur.id_turno) },
            update: {inicioturno:cur.start,
                finturno:cur.end },
            create: { 
                id_trabajador:cur.id_trabajador,
                inicioturno:cur.start,
                finturno:cur.end },
          })
        )
      )
    // const create = await prisma.turnosmedicos.createMany({
    //     data:turnosListos
    // })
    return res.json(collection)
    
}

const putDeleteTurno = async (req,res) =>{
    console.log(req.body)
    const turnos = req.body.datos.map(str => {
        return Number(str);
      });
    await prisma.turnosmedicos.deleteMany({
                    where: { id_turno: {in:turnos} },
    })

    return res.status(200).json({message:"Completado"})
}


module.exports = {
  putUpdateTurno,
  getTurnos,
  putCreateTurno,
  putDeleteTurno
}