"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var port = 3000;
app.use(express.json());
app.get('/', function (_req, res) { return res.send('Hello world!'); });
app.listen(port, function () {
    // eslint-disable-next-line no-console
    console.log("Started server on port " + port);
});
