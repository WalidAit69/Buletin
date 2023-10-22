// staticMiddleware.js
const express = require('express');

const staticMiddleware = express.static((__dirname + '/uploads'));

module.exports = staticMiddleware;
