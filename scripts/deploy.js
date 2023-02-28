const hre = require("hardhat");

// 这是部署脚本的基础设置，我们将在这里进行更多的修改
async function main() {
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const nftMarketplace = await NFTMarketplace.deploy();

  await nftMarketplace.deployed();

  //部署合约时我们会得到很多的属性，但是我们在这里只关注合约的地址
  console.log(` deployed contract Address ${nftMarketplace.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
