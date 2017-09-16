var express = require('express')
var path = require('path')

var app = express()

app.use('/', (req, res) => {
  var urlParts = req.url.split('/')
  if(urlParts[1] === '' || urlParts[1] === ':1') res.sendFile(path.join(__dirname + '/public/index.html'))
  else if(urlParts[1] === 'assets') res.sendFile(path.join(__dirname + '/assets/'+urlParts[2]))
  else res.sendFile(path.join(__dirname + '/public/'+urlParts[1]))
})

app.listen(2000)
