# Optimism Messenger L1->L2 Example

> Send a message from L1 Goerli to L2 [Optimism](https://www.optimism.io/) testnet.

## Example

There's two contracts; `L2Contract.sol` and `L1Contract.sol`

The L1 contract has a method `sendMessageToL2` that sends a message from L1 to L2 contract to set a greeting message on L2 contract.
It sends the encoded calldata to execute `setGreeting` on L2 which can only be called if the message was sent by the L1 contract.

### Files

- [`L2Contract.sol`](./contracts/L2Contract.sol)
- [`L1Contract.sol`](./contracts/L1Contract.sol)
- [`deployL2.js`](./script/deployL2.js)
- [`deployL1.js`](./scripts/deployL1.js)
- [`sendL1ToL2Message.js`](./scripts/sendL1ToL2Message.js)
- [`waitForInclusion.js`](./scripts/waitForInclusion.js)
- [`getGreetingOnL2.js`](./scripts/getGreetingOnL2.js)

## Install

```sh
git clone https://github.com/miguelmota/optimism-messenger-l1-to-l2-example.git
cd optimism-messenger-l1-to-l2-example
npm install
```

### Set Signer

Create `.env`

```sh
PRIVATE_KEY=123...
```

Make sure private key has funds on both Goerli and Optimism testnet.

### Compile Contracts

```sh
npx hardhat compile
```

### Deploy L1 Contract

Command

```sh
npx hardhat run --network goerli scripts/deployL1.js
```

Output

```sh
L1Contract deployed to: 0x21DEC68E1D07B3cC138A5b70063cC744793865e5
```

### Deploy L2 Contract

Command

```sh
L1_CONTRACT=0x21DEC68E1D07B3cC138A5b70063cC744793865e5 \
npx hardhat run --network optimism scripts/deployL2.js
```

Output

```sh
L2Contract deployed to: 0x0bbe3d35D1aA220ad238f578E7720dA4a1FdC30C
```

### Send L1->L2 Message

Command (replace env vars with your values)

```sh
GREETING="hello world" \
L1_CONTRACT=0x21DEC68E1D07B3cC138A5b70063cC744793865e5 \
L2_CONTRACT=0x0bbe3d35D1aA220ad238f578E7720dA4a1FdC30C \
npx hardhat run --network goerli scripts/sendL1ToL2Message.js
```

Output

```sh
sent tx hash 0xadf720ae44585f5244afc2050c09469a2d55d4ea559e0620fe92fa6733b2bf71
https://goerli.etherscan.io/tx/0xadf720ae44585f5244afc2050c09469a2d55d4ea559e0620fe92fa6733b2bf71
```

### Wait for L2 Root Inclusion

Command

```sh
L1_TX_HASH=0xadf720ae44585f5244afc2050c09469a2d55d4ea559e0620fe92fa6733b2bf71 \
npx hardhat run --network optimism scripts/waitForInclusion.js
```

Output

```sh
Waiting for L2 root inclusion (this may take up to 5 minutes)...
L2 root inclusion confirmed
L2 message relayed
```

### Get Greeting on L2

Command

```sh
L2_CONTRACT=0x0bbe3d35D1aA220ad238f578E7720dA4a1FdC30C \
npx hardhat run --network optimism scripts/getGreetingOnL2.js
```

Output

```sh
greeting: hello world
```

### Send L2->L1 Message

See [https://github.com/miguelmota/optimism-messenger-l2-to-l1-example](https://github.com/miguelmota/optimism-messenger-l2-to-l1-example)

## License

[MIT](./LICENSE) @ [Miguel Mota](https://github.com/miguelmota)
