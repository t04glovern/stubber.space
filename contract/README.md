<div align = "center">
    <h1><em>Stubber</em></h1>
    <p>Digitally traceable ticket sales on the blockchain.</p>
    <a href="https://www.ethereum.org/" target="_blank"><img src="https://img.shields.io/badge/Ethereum-ETH-727B9F.svg?longCache=true&style=flat-square" alt="Ethereum"></a>
    <a href="https://solidity.readthedocs.io" target="_blank"><img src="https://img.shields.io/badge/Solidity-0.4.23-blue.svg?longCache=true&style=flat-square" alt="Solidity"></a>
</div>

## About

This repository houses the Stubber ticket sale and management platform. It has been built using Ethereum smart contracts.

## Networks

- ropsten : [0x50efd5453bc3b33b58d2c445556b98b31ba8fb2d](https://ropsten.etherscan.io/address/0x50efd5453bc3b33b58d2c445556b98b31ba8fb2d)

- rinkeby : [0x4497DAC8E29945E3dA45dA426B28BF77138C571E](https://rinkeby.etherscan.io/address/0x4497DAC8E29945E3dA45dA426B28BF77138C571E)


## Developing This Contract

In order to develop this contract the following steps were taken to setup the environment.

Install and run Ganache CLI (formally you would have used TestRPC). Alternatively you can install [Ganche](http://truffleframework.com/ganache/) UI.

```
$ npm install -g ganache-cli
$ ganache-cli -p 7545
```

Navigate into the root of this project and install truffle (if you haven't already got it). Run the truffle test command to compile and test the contracts.

```bash
npm install -g truffle
truffle test
```

The configuration for running the network locally using truffle is in the `truffle.js` file with the configuration below.

```javascript
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
```

### Changing the network Address

To change the network address this Dapp connects to simple open up `src/js/app.js` and change the following line to point at your deployed verions of this repos contract

```javascript
  StubTokenAddress: '0x50efd5453bc3b33b58d2c445556b98b31ba8fb2d',
```

## Attribution

`Ownable.sol`, `ERC721Token.sol` and `assertRevert.js` contracts/tests are provided by the [zeppelin-solidity](https://github.com/OpenZeppelin/zeppelin-solidity) repo.
