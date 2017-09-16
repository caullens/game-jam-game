var express = require('express')
var path = require('path')

var app = express()

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.get('/sketch.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/sketch.js'))
})

app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/style.css'))
})

app.get('/cell.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/cell.js'))
})

app.listen(2000)
