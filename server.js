var express = require('express')
var path = require('path')

var app = express()

app.use('/', (req, res) => {
  var urlParts = req.url.split('/')
  if(urlParts[1] === '' || urlParts[1] === ':1') res.sendFile(path.join(__dirname + '/public/index.html'))
<<<<<<< HEAD
  else if(urlParts[1] === 'assets') res.sendFile(path.join(__dirname + '/assets/'+urlParts[2]))
=======
  if(urlParts[1] === 'assets') res.sendFile(path.join(__dirname + '/assets/'+urlParts[2]))
>>>>>>> 9ce9523ca8a4d28f12b01c251e351fa6840b6a37
  else res.sendFile(path.join(__dirname + '/public/'+urlParts[1]))
})

app.listen(2000)
