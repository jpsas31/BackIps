var express = require('express');
var router = express.Router();

/* GET users listing. */
router.put('/', function(req, res, next) {
  res.json(req.body)
  // res.send('respond with a resource');
});

module.exports = router;
