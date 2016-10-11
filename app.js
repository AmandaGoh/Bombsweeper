var express = require('express')

var app = express()
var port = 3000

app.listen(port)

//The static middleware handles serving up the content from a directory. In this case the 'root' directory is served up and any content (HTML, CSS, JavaScript) will be available.
app.use(express.static(__dirname + '/'))

console.log('Server running at http://localhost: ' + port + '/')
