
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const moment = require('moment')
// const checkDay= (date1,date2) =>{
    
//     date1=moment(date1)
//     date2=moment(date2)
//     console.log(date1.endOf('day').toString())
//     console.log(date2.startOf('day').toString())
//     // if(date1.format('D') === date2.format('D')){
        
//     // }

// }
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
    const turnos = req.body.datos
    let collection=prisma.turnosmedicos.deleteMany({
                    where: { id_turno: {in:turnos} },
    })
                
    // try {
        // collection = await prisma.$transaction(
        turnos.map(cur =>
              prisma.turnosmedicos.delete({
                where: { id_turno: parseInt(cur) },
              }).catch(()=>console.log("no existe"))
            )
        // )
    //   } catch (error) {
    //     console.error(error);
    // //     // expected output: ReferenceError: nonExistentFunction is not defined
    // //     // Note - error messages will vary depending on browser
    //   }
      
    
   
    return res.json(collection)
}


module.exports = {
  putUpdateTurno,
  getTurnos,
  putCreateTurno,
  putDeleteTurno
}