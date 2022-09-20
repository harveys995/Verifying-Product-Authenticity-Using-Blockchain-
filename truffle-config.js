require("babel-register");
require("babel-polyfill");

//Connecting to Ganache Local Blockchain
module.exports = {
  Ganache: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // By using "*" we match with any network ID provided by Ganache
      //gas: 50000000,
    },
  },
  contracts_directory: "./src/Components/Contracts/",
  contracts_build_directory: "./src/Components/abis/",

  // Specifying the Compiler to use, in this project we will ensure we're using v0.8.0 and above
  compilers: {
    solc: {
      version: "^0.8.0",
    },
  },

  // networks: {
  //   ropsten: {
  //     provider: () =>
  //       new HDWalletProvider(
  //         mnemonic,
  //         `https://speedy-nodes-nyc.moralis.io/2bf203d7cf1c94c884b09a06/eth/ropsten`
  //       ),
  //     network_id: 3, // Ropsten's id
  //     gas: 5500000, // Ropsten has a lower block limit than mainnet
  //     confirmations: 2, // # of confs to wait between deployments. (default: 0)
  //     timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
  //     skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
  //   },
  // },
};

// const HDWalletProvider = require("@truffle/hdwallet-provider");
// //
// // const fs = require('fs');
// const mnemonic = require("./secrets.json").mnemonic;
