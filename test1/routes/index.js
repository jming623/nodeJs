var express = require('express');
var router = express.Router();
const api = require("./api"); 

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'NodeJs' });
  console.log("path="+req.path);
  next();
});

router.use("/api",api);

router.all('/',(req,res) => {
  res.send("{message:welcome}")
})

module.exports = router;
