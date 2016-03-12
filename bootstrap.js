const port = 3000;

/* global require, console */

const server = new (require('savannah-server'))({
  port: 3000
});
const System = require('es6-module-loader').System;



System.import('Server.js').then((Server) => {
  var game = new Server.default(server);
  server.listen();
}).catch( (e) => {
  console.log(e);
  console.log(e.stack);
});
