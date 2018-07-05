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
    ropsten: { // 0x50efd5453bc3b33b58d2c445556b98b31ba8fb2d
      provider: function() {
        return new PrivateKeyProvider(privKey, "https://ropsten.infura.io/1LPE9dOwZvYF9JQOPGHz");
      },
      network_id: '3',
    },
    rinkeby: { // 0x4497DAC8E29945E3dA45dA426B28BF77138C571E
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
