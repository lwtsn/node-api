.PHONY : typechain compile test compile-clean console run prettier integration

typechain:
	./src/node_modules/.bin/typechain --target ethers-v5 --outDir src/typechain './src/contracts/Abi/*.json'

run-node:
	yarn hardhat node
