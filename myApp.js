let express = require("express");
const { dirname } = require("path");
let app = express();

console.log("Hello World");

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/views/index.html");
});

console.log(__dirname);
module.exports = app;
