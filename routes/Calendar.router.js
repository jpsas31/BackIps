var express = require('express');
var router = express.Router();
const {
  getEvents,
  createEvent,
  createMeet
} = require ("../controllers/Calendar.controller");
const { checkJwt } = require("../middleware/check-jwt.middleware");

const CalendarRouter = express.Router();

// CalendarRouter.put('/createEvent', async (req, res) => {
//   const response = createEvent(req,res);
// });

CalendarRouter.put('/createMeet',  checkJwt, async (req, res) => {
    const response = createMeet(req,res);
  });

CalendarRouter.post('/get-Calendar', checkJwt,  async (req, res) => {
  const response = getEvents(req,res);
});



module.exports = { CalendarRouter };

