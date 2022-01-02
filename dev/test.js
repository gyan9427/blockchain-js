const BlockChain = require ('./blockchain')

const bitCoin = new BlockChain();
// bitCoin.createNewBlock(123,'SDF23432KLKS','59849KJHF8SDB2')
// bitCoin.createTransaction(234,'gyan','soumya')
// bitCoin.createNewBlock(12,'SDF23432KLKS234','59849KJHF8SFSFDSDB2')
// bitCoin.createNewBlock(2334,'SDFSFJ3020','FKJH9990BN')




// console.log(bitCoin);
// console.log(bitCoin.chain[1]['transactions']);

// console.log(lastBlock);


const previousBlockHash = 'ASD23980KLKJAS090';
// const nonce = 908;
const currentBlockData = [
    {
        amount: 20,
        sender: 'LKK76876JNDSLJKJ',
        recipient: 'KHJH99789JHJBKBT'
    },
    {
        amount: 209,
        sender: 'ASD76876JNDSLJKJ',
        recipient: 'HKJHJHL89JHJBKBT'
    },
    {
        amount: 120,
        sender: 'LLOOJ76876JNDSLJKJ',
        recipient: 'NBNBNB99789JHJBKBT'
    },
];

console.log(bitCoin.proofOfWork(previousBlockHash,currentBlockData));

// console.log(bitCoin.hashBlock(previousBlockHash,currentBlockData,nonce));