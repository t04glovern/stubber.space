require("dotenv").config()
require("babel-register")({
  ignore: /node_modules\/(?!openzeppelin-solidity)/
});
require("babel-polyfill");

var PrivateKeyProvider = require("truffle-privatekey-provider");
const privKey = process.env.PRIV_KEY;

module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
  ropsten: {
    provider: function () {
      return new PrivateKeyProvider(privKey, "https://ropsten.infura.io/" + process.env.INFURA_TOKEN);
      },
      gas: 4500000,
      gasPrice: 21000000000,
      network_id: '3',
    },
  rinkeby: {
    provider: function () {
      return new PrivateKeyProvider(privKey, "https://rinkeby.infura.io/" + process.env.INFURA_TOKEN);
      },
      network_id: '4'
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 500
    }
  }
};
