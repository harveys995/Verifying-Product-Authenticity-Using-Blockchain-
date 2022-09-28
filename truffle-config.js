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
};
