var express = require('express')

var app = express()
var port = 3000

//set up routes
var static_routes = require('./routes/index')

//set middleware for routes
app.use('/static' , static_routes)

//the view engine for express is ejs. Hence, res.render(index) => index.ejs inside VIEWS folder
app.set('view engine', 'ejs')

//capture all the request, assuming all static files is inside public foler
app.use(express.static(__dirname + '/static'))

app.get('/', function (req, res){
  res.render('index', {header: 'Bomb Sweeper'})
})


app.listen(port)
console.log('Server running at http://localhost: ' + port + '/')
