require("babel-register")({
  ignore: /node_modules\/(?!zeppelin-solidity)/
});
require("babel-polyfill");

var PrivateKeyProvider = require("truffle-privatekey-provider");
const privKey = "b7772620229ebac5e237bf982d28def601108e3f56cd795568104c5c26dfa6c7"

module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: { // 0x7edea2e13593fc40cc47c1710b1c6e9ed7cff974
      provider: function() {
        return new PrivateKeyProvider(privKey, "https://ropsten.infura.io/1LPE9dOwZvYF9JQOPGHz");
      },
      gas: 4500000,
      gasPrice: 21000000000,
      network_id: '3',
    },
    rinkeby: { // 0x7b1c6b2be49580f7f1facc87402f4a57cf34c42c
      provider: function() {
        return new PrivateKeyProvider(privKey, "https://rinkeby.infura.io/1LPE9dOwZvYF9JQOPGHz")
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
