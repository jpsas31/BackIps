const express = require("express");
const {
  getInfoUser
} = require("../controllers/auth.controller");
const { checkJwt } = require("../middleware/check-jwt.middleware");

const authUserRouter = express.Router();



authUserRouter.post("/getInfo", checkJwt, async (req, res) => {
  console.log(req.body)
  const message = await getInfoUser(req,res);
  // message='erqwrewrw'
  console.log(message.data)


  res.status(200).json(message.data);
});

module.exports = { authUserRouter };