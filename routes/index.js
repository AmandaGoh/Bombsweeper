var express = require('express')
var router = express.Router()

router.get('/', function(req, res){
  res.send('routing static pages')
})

module.exports= router
