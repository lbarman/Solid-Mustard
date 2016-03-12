const logger = require('morgan');
const path = require('path');
const engineio = require('engine.io');
const resolve = require('resolve');

const TRACEUR_PATH = resolve.sync('traceur', {basedir: process.cwd()});
const ES6_LOADER_PATH = resolve.sync('es6-module-loader', {basedir: process.cwd()});
const ENGINE_IO_PATH = resolve.sync('engine.io-client');

function Server(conf) {

  if (!conf) conf = {};

  this._port = conf.port || 3000;

  var express = require('express');
  var app = express();

  app.use(logger('combined'));
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');

  app.get('/', (req, res) => {
    res.render('index_dev', {
      title: 'My awesome game',
      port: this._port
    });
  });
  app.get('/lib/traceur.js', (req, res) => {
    res.sendFile(path.join(TRACEUR_PATH, '../../../bin/traceur.js'));
  });
  app.get('/lib/es6-module-loader-dev.js', (req, res) => {
    res.sendFile(path.join(ES6_LOADER_PATH, '../dist/es6-module-loader-dev.js'));
  });
  app.get('/lib/engine.io.js', (req, res) => {
    res.sendFile(path.join(ENGINE_IO_PATH, '../engine.io.js'));
  });

  app.use('/', express.static(process.cwd()));

  this.server = require('http').createServer(app);
  this.io = engineio(this.server);
}

Server.prototype.listen = function (cb) {
  this.server.listen(this._port, () => {
    console.log(`Server started on port ${this._port}`);
    if (cb) cb();
  });
};

module.exports = Server;
