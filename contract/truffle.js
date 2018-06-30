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
    ropsten: { // 0xdb4a5219fbe5e0bb4a194a714b5e4711daceb04d
      provider: function() {
        return new PrivateKeyProvider(privKey, "https://ropsten.infura.io/1LPE9dOwZvYF9JQOPGHz");
      },
      network_id: '3',
    },
    rinkeby: { // 0x0618479A6adE6fb3B498f1aE4914f8C251Ce3e20
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
