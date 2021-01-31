.PHONY : typechain run-node giveToken

typechain:
	./node_modules/.bin/typechain --target ethers-v5 --outDir src/typechain './src/contracts/Abi/*.json'

run-node:
	@npx hardhat node --fork https://eth-mainnet.alchemyapi.io/v2/aY23iBDYGmLE7QvHpqRpkLoUBfm1xBme

setup:
	npx hardhat --network localhost run helpers/setup.ts
