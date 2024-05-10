const ethers_ = require("ethers");
const fs_ = require("fs");
require("dotenv").config();

async function main() {
    console.log(process.env.PRIVATE_KEY);
    console.log(process.env.RPC_URL);
    const provider = new ethers_.JsonRpcProvider(process.env.RPC_URL);

    const wallet = new ethers_.Wallet(process.env.PRIVATE_KEY, provider);

    const abi = fs_.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.abi",
        "utf8",
    );
    const binary = fs_.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf8",
    );
    const contractFactory = new ethers_.ContractFactory(abi, binary, wallet);
    console.log("Deploying, please wait...");
    const contract = await contractFactory.deploy();
    let contractAddress = await contract.getAddress();
    console.log("Constract Address :", contractAddress);
    await contract.deploymentTransaction().wait(1);
    console.log("Deploy success...");

    const currentFavoriteNumber = await contract.retrieve();
    console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`);

    const storeResponse = await contract.store("78");
    await storeResponse.wait(1);

    const updatedFavoriteNumber = await contract.retrieve();
    console.log(`Updated favorite number: ${updatedFavoriteNumber.toString()}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
