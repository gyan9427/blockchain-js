const sha256 = require('sha256')
const currentNodeUrl = process.argv[3]
const { v1: uuidv1 } = require('uuid');

class BlockChain {
    constructor() {
        this.chain = [];
        this.pendingTransactions = [];

        this.currentNodeUrl = currentNodeUrl;
        this.networkNodes = [];

        //genesis block
        this.createNewBlock(100,'0','0');
    }

    createNewBlock(nonce, previousBlockHash, hash) {
        const newBlock = {
            index: this.chain.length + 1,
            timestamp: Date.now(),
            transactions: this.pendingTransactions,
            nonce: nonce,
            previousBlockHash: previousBlockHash,
            hash: hash      //These are the transactions within the new blockchains   
        };

        this.pendingTransactions = [];
        this.chain.push(newBlock);

        return newBlock;
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    createTransaction(amount, sender, recipient) {
        const newTransaction = {
            amount: amount,
            sender: sender,
            recipient: recipient,
            transactionId: uuidv1().split('-').join()
        }

        return newTransaction;
    }

    addTransactionToPendingTransactions(transactionObject){
        
        this.pendingTransactions.push(transactionObject)
        return this.getLastBlock()['index'] + 1;
    }

    hashBlock(previousBlockHash,currentBlockData,nonce){
        const dataString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
        const hash  = sha256(dataString);
        return hash;        
    }

    proofOfWork(previousBlockHash,currentBlockData){
        let nonce = 0;
        let hash = this.hashBlock(previousBlockHash,currentBlockData,nonce);
        while(hash.substring(0,4) !== '0000'){
            nonce++;
            hash = this.hashBlock(previousBlockHash,currentBlockData,nonce);
        }
        return nonce;
    }

    chainIsValid(blockchain){
        let validChain = true;

        for (var i = 1; i < blockchain.length; i++) {
            const currentBlock = blockchain[i];
            const prevBlock = blockchain[i - 1];
            const blockHash = this.hashBlock(prevBlock['hash'], { transactions: currentBlock['transactions'], index: currentBlock['index'] }, currentBlock['nonce']);
            if (blockHash.substring(0, 4) !== '0000') validChain = false;
            if (currentBlock['previousBlockHash'] !== prevBlock['hash']) validChain = false;
        };
    
        const genesisBlock = blockchain[0];
        const correctNonce = genesisBlock['nonce'] === 100;
        const correctPreviousBlockHash = genesisBlock['previousBlockHash'] === '0';
        const correctHash = genesisBlock['hash'] === '0';
        const correctTransactions = genesisBlock['transactions'].length === 0;
    
        if (!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions) validChain = false;
    
        return validChain;
    }

    getBlock(blockHash){
        let correctBlock = null;
        this.chain.forEach(block => {
            if(block.hash === blockHash) correctBlock = block;
        })

        return correctBlock;
    }

    getTransaction(transactionId){
        let correctTransaction = null;
        let correctBlock = null;

        this.chain.forEach(block => {
            block.transactions.forEach(transaction => {
                if(transactionId === transaction.transactionId){
                    correctTransaction = transactionId;
                    correctBlock = block;
                }
            })
        })

        return {
            transactionId : correctTransaction,
            block : correctBlock
        }
    }
}

module.exports = BlockChain;