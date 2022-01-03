const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { v1: uuidv1 } = require('uuid');
const port = process.argv[2];

const nodeAddress = uuidv1().split('-').join('');

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
    const lastBlock = bitcoin.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transactions: bitcoin.pendingTransactions,
        index: lastBlock['index']+1
    };
    const nonce = bitcoin.proofOfWork(previousBlockHash,currentBlockData);
    const blockHash = bitcoin.hashBlock(previousBlockHash,currentBlockData,nonce);

    //reward for mining
    bitcoin.createTransaction(12.5,"0.0",nodeAddress);

    const newBlock = bitcoin.createNewBlock(nonce,previousBlockHash,blockHash);
    res.json({
        note: "New Block Created Successfully",
        block: newBlock
    })
});

//will register a new node and broadcast to the other nodes
app.post('/register-and-broadcast-node',function(req,res){

});

//will register the port address of new node being added no broadcast
app.post('/register-node',function(req,res){

})

//registers nodes requests in bulk
app.post('/register-nodes-bulk',function(req,res){

})

app.listen(port, function () {
    console.log(`listening to port ${port}...`);
})