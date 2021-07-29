const { RSA_NO_PADDING } = require("constants");
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/post/', function (req,res) {
    res.send("hej post lol")
});

app.get('/get/' , function (req, res) {
    res.send("hej get lol")
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});



app.listen(80);