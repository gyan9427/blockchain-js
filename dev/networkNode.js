const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { v1: uuidv1 } = require('uuid');
const port = process.argv[2];
const rp = require('request-promise');

const nodeAddress = uuidv1().split('-').join('');

const Blockchain = require('./blockchain');
const requestPromise = require("request-promise");
const { options } = require("nodemon/lib/config");
const bitcoin = new Blockchain()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/blockchain', function (req, res) {
    res.send(bitcoin);
});

app.post('/transaction', function (req, res) {
    const newTransaction = req.body;
    const blockIndex = bitcoin.addTransactionToPendingTransactions(newTransaction);

    res.json({ note: `Block is created at ${blockIndex}.` })
});

app.post('/transaction/broadcast', function (req,res){
    const newTransaction = bitcoin.createTransaction(req.body.amount,req.body.sender,req.body.recepient);
    bitcoin.addTransactionToPendingTransactions(newTransaction);

    const requestPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/transaction',
            method: 'POST',
            body: newTransaction,
            json: true
        }
        
        requestPromises.push(rp(requestOptions));
        
    })

    Promise.all(requestPromises).then(data =>{
        console.log("here");
        res.json({ note:'A new transaction is created and broadcasted' });
    })
})

app.get('/mine', function (req, res) {
    const lastBlock = bitcoin.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transactions: bitcoin.pendingTransactions,
        index: lastBlock['index']+1
    };
    const nonce = bitcoin.proofOfWork(previousBlockHash,currentBlockData);
    const blockHash = bitcoin.hashBlock(previousBlockHash,currentBlockData,nonce);


    const newBlock = bitcoin.createNewBlock(nonce,previousBlockHash,blockHash);

    const requestPromises=[];
    bitcoin.networkNodes.forEach(networkNodeUrl=>{
        const requestOptions = {
            uri: networkNodeUrl + "/receive-new-block",
            method: 'POST',
            body: {newBlock:newBlock},
            json: true
        }

        requestPromises.push(rp(requestOptions));
    })

    Promise.all(requestPromises)
    .then(data => {
        const requestOptions = {
            uri: bitcoin.currentNodeUrl+'transaction/broadcast',
            method: 'POST',
            body: {
                amount: 12.5,
                sender:"0.0",
                recepient: nodeAddress
            },
            json:true
        }

        return rp(requestOptions);
    })
    .then(data => {
        res.json({
            note: "New Block mined and broadcast successfully",
            block: newBlock
        })
    })
    
});

//will register a new node and broadcast to the other nodes
app.post('/register-and-broadcast-node',function(req,res){
    
    // assigning new node URL to newNodeUrl
    
    const newNodeUrl = req.body.newNodeUrl;

    //if the passed one is not present in the list
    if(bitcoin.networkNodes.indexOf(newNodeUrl) == -1)bitcoin.networkNodes.push(newNodeUrl);

    //create an array of regNodesPromises
    const regNodesPromises = [];
    
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/register-node',
            method: 'POST',
            body: {newNodeUrl:newNodeUrl},
            json:true
        }

        regNodesPromises.push(rp(requestOptions));
        
    });
    // console.log(JSON.stringify(regNodesPromises));
    
    Promise.all(regNodesPromises).then(data => {
        //this registers url from  regNodesPromises
        const bulkRegisterOptions = {
            uri: newNodeUrl + '/register-nodes-bulk',
            method: 'POST',
            body: { allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl]},
            json: true
        };
        
        return rp(bulkRegisterOptions);
    }).then(data => {
        res.json({note: 'New node registered with network successfully.'});
    });
});

//will register the port address of new node being added no broadcast
app.post('/register-node',function(req,res){
    const newNodeUrl = req.body.newNodeUrl;
    const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
    const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
    if(nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(newNodeUrl);
    res.json({ note:'New node registered successfully with node.'});

})

//registers nodes requests in bulk
app.post('/register-nodes-bulk',function(req,res){
    // console.log(bitcoin.networkNodes);
    const allNetworkNodes = req.body.allNetworkNodes;
    allNetworkNodes.forEach(networkNodeUrl=>{
        const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
        const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
        if(nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(networkNodeUrl);
    });
    res.json({note: "nodes registered successfully."});
})

app.listen(port, function () {
    console.log(`listening to port ${port}...`);
})
