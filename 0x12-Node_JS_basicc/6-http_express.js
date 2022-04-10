const express = require('express');

const application = express();
const port = 1245;

application.get('/', (req, res) => {
  res.send('Hello Holberton School!');
}).listen(port);

module.exports = application;
