const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const Blockchain = require('./blockchain');
const bitcoin = new Blockchain()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/blockchain', function (req, res) {
    res.send(bitcoin);
});

app.post('/transaction', function (req, res) {
    const blockIndex = bitcoin.createTransaction(req.body.amount,req.body.sender,req.body.recepient);
    res.send(`The transaction is created at block no ${blockIndex}`);
});

app.get('/mine', function (req, res) {
});

app.listen(3000, function () {
    console.log("listening to port 3000...");
})