<div align = "center">
    <h1><em>Stubber</em></h1>
    <p>Digitally traceable ticket sales on the blockchain.</p>
    <a href="https://www.ethereum.org/" target="_blank"><img src="https://img.shields.io/badge/Ethereum-ETH-727B9F.svg?longCache=true&style=flat-square" alt="Ethereum"></a>
    <a href="https://solidity.readthedocs.io" target="_blank"><img src="https://img.shields.io/badge/Solidity-0.4.23-blue.svg?longCache=true&style=flat-square" alt="Solidity"></a>
</div>

# About

---

This repository houses the Stubber ticket sale and management platform. It has been built using Ethereum smart contracts.

There are two components that make up this system:

* [contract/](contract/README.md) - folder is for both the Stubber contract and a lightweight frontend that can be used to manage the stubber contract without running the full frontend.

* [frontend/](frontend/README.md) - Contains the main Stubber frontend written in React and utilizing Drizzle for blockchain interactions.

## ETH Networks

---

Stubber is live on Ropsten testnet at the following address. This address will be different if you do decide to redeploy.

* ropsten : [0xf75d6fa723d2c7c6e43be335ebb1fdd3b623a19b](https://ropsten.etherscan.io/address/0xf75d6fa723d2c7c6e43be335ebb1fdd3b623a19b)

## Attribution

---

`Ownable.sol`, `ERC721Token.sol` and `assertRevert.js` contracts/tests are provided by the [zeppelin-solidity](https://github.com/OpenZeppelin/zeppelin-solidity) repo.
