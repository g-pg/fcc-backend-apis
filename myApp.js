let express = require("express");
const { dirname } = require("path");
let app = express();

console.log("Hello World");

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function (req, res) {
	res.json({ message: "Hello json" });
});

app.use("/public", express.static(__dirname + "/public"));

module.exports = app;
