const prims= require('@prisma/client')
const prisma = new prims.PrismaClient()
const axios = require('axios').default

const getInfoUser = async (req,res) =>{

  let options = {
    method: 'POST',
    url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    data: `{"client_id":"${process.env.CLIENT_ID}","client_secret":"${process.env.CLIENT_SECRET}","audience":"https://${process.env.AUTH0_DOMAIN}/api/v2/","grant_type":"client_credentials"}`
  }
  const token = await axios.request(options)
  const bear = `Bearer ${token.data.access_token}`
  options = {
    method: 'GET',
    url: `https://dev-c4rtea7o.us.auth0.com/api/v2/users/${req.body.userId}`,
    headers: { authorization: bear }
  }
  const auth = await axios.request(options)
  let resultado = await prisma.usuarios.findFirst({
    where: {
        id_usuario: req.body.userId,
    }
  })
  
  if(resultado){
    if(resultado.tipo_usuario.localeCompare('trabajador') ===0 )
    {
      const esMedico = await prisma.medicos.findFirst({
        where: {
            id_trabajador: req.body.userId,
        }
      })
      if(esMedico){
        resultado.tipo_usuario='Medico'
      }else{
        resultado.tipo_usuario='Admin'
      }

    }else{
      resultado.tipo_usuario='Paciente'
    }
    auth.data.tipo_usuario=resultado.tipo_usuario
    auth.data.estado= resultado.estado
  }else{
    auth.data.tipo_usuario='noregistro'
    auth.data.estado= true
  }
  console.log(auth)
  return auth

}
  
module.exports = {
  getInfoUser
};
