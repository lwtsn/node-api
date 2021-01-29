.PHONY : typechain compile test compile-clean console run prettier integration

typechain:
	./node_modules/.bin/typechain --target ethers-v5 --outDir typechain './contracts/*.json'

test:
	ts-mocha -p tsconfig.json test/**/*.spec.ts
