const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const axios = require("axios");
const app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Proxy methods to bypass CORS
app.use('/post/', function (req, res) {
    axios.post('http://localhost:5100/p.json', req.body)
    .then( response => {
        res.send(response.data);
    }).catch (error => {
        console.log(error);
    })
});

app.use('/get/:id/' , function (req, res) {
    axios.get('http://localhost:5100/p/'+req.params['id']+'.json')
    .then( response => {
        res.send(response.data);
    }).catch(error => {
        console.error(error);
    });
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(80);