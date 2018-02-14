const BabelTransformer = require('./lib/BabelTransformer')

// set jsx transform
BabelTransformer.install();

const express    = require('express')
const app        = express();
const path       = require('path')
const utils      = require('./lib/utils')
const Renderer   = require('./lib/Renderer.jsx')
const Reloader   = require('./lib/Reloader')
const api        = require('../server/bootstrap')
const client     = require('../app/client');
const morgan     = require('morgan')
const morganJson = require('morgan-json')
const fs         = require('fs')

// app setup
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// logging

var accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), {flags: 'a'})
app.use(morgan(morganJson({
  method: ':method',
  url: ':url',
  status: ':status',
  length: ':res[content-length]',
  'response-time': ':response-time ms'
}), {stream: accessLogStream}))

// socket reload
Reloader.open(app);

// setup api

api(app)

// render app

app.use('*', (req, res, next) => {

  if(utils.isAsset(req.originalUrl)) {
    return next();
  }

  Renderer
    .render(req.originalUrl)
    .then( (resp) => {
      return Promise.resolve(
        res.render(
          'index', 
          { title: 'Test' || 'Test', content: resp.html , data: resp.data }, 
          (err, html) => res.send(html)
        )
      )
    })
    .catch( err => {
      res.send(res.render(
          'index', 
          { title: 'Test' || 'Test', content: 'Error' , data: {} }, 
          (err, html) => res.send(html)
      ))
    })
  
})

const server = app.listen(3000);

process.once('SIGUSR2', function() {
  if(Reloader.socket) {
    Reloader.socket.emit('change')
  }
  Reloader.close();
  server.close();
  setTimeout(() => {
    process.kill(process.pid, 'SIGUSR2');
  }, 100)
})