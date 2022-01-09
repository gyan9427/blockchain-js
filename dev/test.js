const BlockChain = require ('./blockchain')

const bitCoin = new BlockChain();
// bitCoin.createNewBlock(123,'SDF23432KLKS','59849KJHF8SDB2')
// bitCoin.createTransaction(234,'gyan','soumya')
// bitCoin.createNewBlock(12,'SDF23432KLKS234','59849KJHF8SFSFDSDB2')
// bitCoin.createNewBlock(2334,'SDFSFJ3020','FKJH9990BN')




// console.log(bitCoin);
// console.log(bitCoin.chain[1]['transactions']);

// console.log(lastBlock);


// const previousBlockHash = 'ASD23980KLKJAS090';
// // const nonce = 908;
// const currentBlockData = [
//     {
//         amount: 20,
//         sender: 'LKK76876JNDSLJKJ',
//         recipient: 'KHJH99789JHJBKBT'
//     },
//     {
//         amount: 209,
//         sender: 'ASD76876JNDSLJKJ',
//         recipient: 'HKJHJHL89JHJBKBT'
//     },
//     {
//         amount: 120,
//         sender: 'LLOOJ76876JNDSLJKJ',
//         recipient: 'NBNBNB99789JHJBKBT'
//     },
// ];

const bc1 = {
    "chain": [
        {
        "index": 1,
        "timestamp": 1641724734160,
        "transactions": [],
        "nonce": 100,
        "previousBlockHash": "0",
        "hash": "0"
        },
        {
        "index": 2,
        "timestamp": 1641724900886,
        "transactions": [
        {
        "amount": 20,
        "sender": "AHJ438098JHUJHUIH78907",
        "transactionId": "7c1c4ee0,7138,11ec,b782,33d4d43f863c"
        },
        {
        "amount": 30,
        "sender": "AHJ438098JHUJHUIH78907",
        "transactionId": "7efc1640,7138,11ec,b782,33d4d43f863c"
        }
        ],
        "nonce": 4052,
        "previousBlockHash": "0",
        "hash": "0000f714888222b659fd9fa3ebb806d4e35a4e30cda1a81dbd434045c07acba1"
        },
        {
        "index": 3,
        "timestamp": 1641725300848,
        "transactions": [
        {
        "amount": 12.5,
        "sender": "0.0",
        "recipient": "577c1660713811ecb78233d4d43f863c",
        "transactionId": "bade7090,7138,11ec,b782,33d4d43f863c"
        },
        {
        "amount": 40,
        "sender": "AHJ438098JHUJHUIH78907",
        "transactionId": "9eb77320,7139,11ec,b782,33d4d43f863c"
        },
        {
        "amount": 50,
        "sender": "AHJ438098JHUJHUIH78907",
        "transactionId": "a3057080,7139,11ec,b782,33d4d43f863c"
        }
        ],
        "nonce": 56567,
        "previousBlockHash": "0000f714888222b659fd9fa3ebb806d4e35a4e30cda1a81dbd434045c07acba1",
        "hash": "0000c8b7a7e71682562e208b3202fc00d4e90c6180d003fabbc87e878a0b2946"
        }
        ],
        "pendingTransactions": [
        {
        "amount": 12.5,
        "sender": "0.0",
        "recipient": "577c1660713811ecb78233d4d43f863c",
        "transactionId": "a943f340,7139,11ec,b782,33d4d43f863c"
        }
        ],
        "currentNodeUrl": "http://localhost:3001",
        "networkNodes": [
        "http://localhost:3002",
        "http://localhost:3003",
        "http://localhost:3004"
        ]
}

// console.log(bitCoin.proofOfWork(previousBlockHash,currentBlockData));

console.log(bitCoin.chainIsValid(bc1.chain))

// console.log(bitCoin.hashBlock(previousBlockHash,currentBlockData,nonce));