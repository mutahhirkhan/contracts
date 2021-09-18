//1. Initialize `truffle-hdwallet-provider`
const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config()

// Set your own mnemonic here
const mnemonic = process.env.MNEMONIC;
const rinkebyApiKey = process.env.INFURA_RINKEBY_API_KEY;
const mainnetApiKey = process.env.INFURA_MAINNET_API_KEY;

console.log("hiiii ");
console.log(rinkebyApiKey);
// Module exports to make this configuration available to Truffle itself
module.exports = {
  // Object with configuration for each network
  networks: {
    // Configuration for mainnet

    mainnet: {
      provider: function () {
        // Setting the provider with the Infura Mainnet address and Token
        return new HDWalletProvider(
          mnemonic,
          mainnetApiKey
        );
      },
      network_id: "1",
    },
    // Configuration for rinkeby network
    rinkeby: {
      // Special function to setup the provider
      provider: function () {
        // Setting the provider with the Infura Rinkeby address and Token
        return new HDWalletProvider(
          mnemonic,
          rinkebyApiKey
        );
      },
      network_id: 4, //Fill in the `network_id` for the Rinkeby network.
    },
  },
};