const hre = require('hardhat')
const wait = require('wait')
const { CrossChainMessenger, MessageStatus, StandardBridgeAdapter } = require('@eth-optimism/sdk')
const hardhatConfig = require('../hardhat.config')
require('dotenv').config()

async function main() {
  console.log('Waiting for L2 root inclusion (this may take up to 5 minutes)...')
  while (true) {
    const l1TxHash = process.env.L1_TX_HASH

    const ccm = new CrossChainMessenger({
      l1ChainId: 5,
      l2ChainId: 420,
      l1SignerOrProvider: new hre.ethers.providers.StaticJsonRpcProvider(hardhatConfig.networks.goerli.url),
      l2SignerOrProvider: new hre.ethers.providers.StaticJsonRpcProvider(hardhatConfig.networks.optimism.url),
      bedrock: true
    })

    const messageStatus = await ccm.getMessageStatus(l1TxHash)
    if (messageStatus === MessageStatus.READY_FOR_RELAY) {
      console.log('L2 root inclusion confirmed')
      break
    }
    if (messageStatus === MessageStatus.RELAYED) {
      console.log('L2 message relayed')
      break
    }
    if (messageStatus === MessageStatus.FAILED_L1_TO_L2_MESSAGE) {
      console.log('L2 message failed')
      break
    }

    await wait (10 * 1000)
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
