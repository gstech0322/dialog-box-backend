const axios = require("axios");
var Web3 = require("web3");
const { Controllers } = require("../../controllers");
var artTokenContractABI = require("../abis/artToken.json");

const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.WS_URL));
// const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:3000"));
const _Contract = new web3.eth.Contract(
    artTokenContractABI.abi,
    process.env.CONTRACT_ADDRESS
);

// Saving Item Added For Sale in Database
_Contract.events.ItemAddedForSale()
    .on('data', event => {
        const tokenId = event.returnValues.tokenId;
        addNewNft(tokenId);
    })

// Update Item Sold in Database
_Contract.events.ItemSold()
    .on('data', (event) => {
        console.log(event);
        const token_id = event.returnValues.id;
        const buyer = event.returnValues.buyer;
        Controllers.NFTController.updateNFTByEvent(token_id, buyer);
    })

const addNewNft = async (tokenId) => {
    try {
        let res = await axios.get(`https://deep-index.moralis.io/api/v2/nft/0x426a17AE20c55433090DEAEf309d76E9236a1b6B/${tokenId}?chain=ropsten&format=decimal`, {
            headers: {
                "Content-type": "application/json",
                "X-API-Key": process.env.MORALIS_API_KEY
            }
        })
        let data = res.data;
        data.onSale = false;
        Controllers.NFTController.compareAndSaveNFTs(data); // Data compare and save
    } catch (error) {
        // console.log(error, ": Get NFT data Error");
    }
}

// Get All NFT Data From Smart Contract
exports.getCountNft = async () => {
    try {
        const count = await Controllers.NFTController.totalCount();
        checkAndSaveNFT(93 + count + 1);
    } catch (error) {
        console.log(error);
    }
};

const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
const checkAndSaveNFT = async (count) => {
    // Getting All NFTs from Smart Contract.
    let itemForSale = await _Contract.methods.itemsForSale(count).call()

    if (itemForSale.seller === NULL_ADDRESS) {
        console.log("Data saved successfully!");
        return;
    } else {
        let res = await axios.get(`https://deep-index.moralis.io/api/v2/nft/0x426a17AE20c55433090DEAEf309d76E9236a1b6B/${count}?chain=ropsten&format=decimal`, {
            headers: {
                "Content-type": "application/json",
                "X-API-Key": process.env.MORALIS_API_KEY
            }
        })
        if (res.data.token_uri !== null && (res.data.token_uri).charAt(0) === "{" && JSON.parse(res.data.token_uri).hasOwnProperty("owner")) {
            let data = res.data;
            data.onSale = itemForSale.onSale;
            Controllers.NFTController.compareAndSaveNFTs(data); // Data compare and save
            checkAndSaveNFT(count + 1);
        } else {
            checkAndSaveNFT(count + 1);
        }
    }
};