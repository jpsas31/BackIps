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
  return await axios.request(options)

}
  
module.exports = {
  getInfoUser
};
