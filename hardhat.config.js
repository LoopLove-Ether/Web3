require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
//将在这里对hardhat进行全局的配置
//当我们将智能合约部署到本地区块链时，我们必须定义何时将智能合约部署到其他的测试网络中
//所以我们在这个文件当中需要定义很多的属性

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {},
  },
};
