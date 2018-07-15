# Stubber - Contract

This part of the repo is responsible for development and deployment of the Stubber smart contract to the Ethereum blockchain.

There is also a very small frontend application that was used during the initial development of the Stubber platform under the `src/` folder.

## Developing

---

In order to develop this contract the following steps were taken to setup the environment.

```bash
## Install project dependencies
npm install
```

Install and run Ganache CLI (formally you would have used TestRPC). Alternatively you can install [Ganche](http://truffleframework.com/ganache/) UI.

```bash
npm install -g ganache-cli
ganache-cli -p 8545
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

## Deployment

---

The current configuration is setup to use [INFURA gateway](https://infura.io/) for deployment. You will need to register for a free Token on their site.

You'll also need to create a development wallet and get a hold of the private key to use it.

With both these pieces of data, create a file called `.env` in this part of the repo and deplace the two fields. Check `.env.example` for an example.

```bash
## .env
PRIV_KEY="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
INFURA_TOKEN="XXXXXXXXXXXXXXXXXXXX"
```

### Compile and Migrate

Once your keys and token is setup, you can run the following to compile and then migrate to ropsten

```bash
truffle compile
truffle migrate --network ropsten
```

**NOTE** *I've left the configuration for Rinkeby in truffle-config.js / truffle.js as an example for how to deploy there.*

## Test Interface

---

### Changing the network Address

To change the network address this Dapp connects to simple open up `src/js/app.js` and change the following line to point at your deployed verions of this repos contract

```javascript
  StubTokenAddress: '0x000...',
```

## Attribution

`Ownable.sol`, `ERC721Token.sol` and `assertRevert.js` contracts/tests are provided by the [zeppelin-solidity](https://github.com/OpenZeppelin/zeppelin-solidity) repo.
