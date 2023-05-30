require("dotenv").config();
const bodyParser = require('body-parser');
let express = require("express");
const { dirname } = require("path");
let app = express();
console.log("Hello World");


app.use(bodyParser.urlencoded({extended: false}))

app.use(function(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.post('/name', function(req, res) {
  res.json({name: `${req.body.first} ${req.body.last}`})
})
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function(req, res) {
  let msg = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") msg = msg.toUpperCase();
  res.json({ message: msg });
});

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({ time: req.time })
})

app.get('/:word/echo', function (req, res) {
  let word = req.params.word;
  res.json({echo: word})
})

app.route('/name').get(function (req, res) {
  res.json({name: `${req.query.first} ${req.query.last}`})
})

app.use("/public", express.static(__dirname + "/public"));

module.exports = app;
