import StubToken from "./contracts/StubToken.json";

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [
    StubToken
  ]
}

export default drizzleOptions
