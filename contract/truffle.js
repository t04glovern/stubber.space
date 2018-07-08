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
    ropsten: { // 0xa92439b2959ced85f24a34bf08036fc21467cf00
      provider: function() {
        return new PrivateKeyProvider(privKey, "https://ropsten.infura.io/1LPE9dOwZvYF9JQOPGHz");
      },
      gas: 4500000,
      gasPrice: 21000000000,
      network_id: '3',
    },
    rinkeby: { // 0x8697ccad2732b62c0aa394352dc8353e8334d442
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
