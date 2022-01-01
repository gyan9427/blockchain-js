class BlockChain {
    constructor() {
        this.chain = [];
        this.pendingTransactions = [];
    }

    createNewBlock(nonce,previousBlockHash,hash){
        const newBlock = {
            index: this.chain.length +1,
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

    getLastBlock(){
        return this.chain[this.chain.length - 1];
    }

    createTransaction(amount,sender,recipient){
        const newTransaction={
            amount: amount,
            sender : sender,
            recipient : recipient
        }

        this.pendingTransactions.push(newTransaction)

        return this.getLastBlock()['index'] +1;
    }
}

module.exports = BlockChain;