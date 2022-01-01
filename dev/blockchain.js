class BlockChain {
    constructor() {
        this.chain = [];
        this.newTransactions = [];
    }

    createNewBlock(nonce,previousBlockHash,hash){
        const newBlock = {
            index: this.chain.length +1,
            timestamp: Date.now(),
            transactions: this.newTransactions,
            nonce: nonce,
            previousBlockHash: previousBlockHash,
            hash: hash      //These are the transactions within the new blockchains   
        };

        this.newTransactions = [];
        this.chain.push(newBlock);

        return newBlock;
    }
}

module.exports = BlockChain;