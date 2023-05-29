require("dotenv").config();
let express = require("express");
const { dirname } = require("path");
let app = express();
console.log("Hello World");

app.use(function (req, res, next) {
	console.log(`${req.method} ${req.path} - ${req.ip}`);
	next();
});

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function (req, res) {
	let msg = "Hello json";
	if (process.env.MESSAGE_STYLE === "uppercase") msg = msg.toUpperCase();
	res.json({ message: msg });
});

app.use("/public", express.static(__dirname + "/public"));

module.exports = app;
