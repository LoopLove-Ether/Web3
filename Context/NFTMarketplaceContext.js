import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers"; //ethers.js
import { useRouter } from "next/router";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";

//下面的公共API密钥已经不能使用了
// const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0"); //在这里传入infura的个人url(需要到这个平台上去注册)
//后面我们会讲如何为IPFS创建自己的infura url.

const projectId = "2LfYiYlHmlfbcSacbbOT3jPQ6Uw";
const projectSecretKey = "8537943b38dd76d418da90ee77661491";
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
  "base64"
)}`; //身份验证(base64编码)

const subdomain = "https://loop-nft-marketplace.infura-ipfs.io"; //专用网关子域(格式没问题)

//设置客户端对象属性
const client = ipfsHttpClient({
  host: "infura-ipfs.io", //主机
  port: 5001, //端口
  protocol: "https", //协议
  headers: {
    //标头
    authorization: auth,
  },
});

//INTERNAL IMPORT
import { NFTMarketplaceABI, NFTMarketplaceAddress } from "./constants";

//---FETCHING SMART CONTRACT
//通过ABI，合约地址，签名者Or提供者来抓取智能合约
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider
  );

//可重用的函数(我们可以在整个应用程序中的任何地方使用)
//我们使用这个函数调用智能合约，当智能合约调用我们的web3Modal包时，它将自动尝试连接Metamask钱包;
//我们需要将智能合约与前端应用程序通信
//抽象一段代码并创建一个单独的函数
//我们必须在处理数据的时候同步行为，所以这里使用异步函数
//---CONNECTING WITH SMART CONTRACT
const connectingWithSmartContract = async () => {
  //现在我们处理错误的时候采用try-catch的方法
  //在之后当我们构建API的时候可以创建全局错误处理，相当于是一个系统，它可以处理我们应用程序的所有错误
  try {
    const web3Modal = new Web3Modal(); //使用web3modal这个包中的属性
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner(); //以便与我们智能合约交互的人成为signer
    const contract = fetchContract(signer); //将signer作为参数传递进去，以便智能合约与特定的用户进行交互
    return contract;
  } catch (error) {
    console.log("Something went wrong while connecting with contract");
  }
};

//我们将创建context来管理所有的状态和数据
export const NFTMarketplaceContext = React.createContext();

//箭头函数
export const NFTMarketplaceProvider = ({ children }) => {
  const titleData = "Discover, collect, and sell NFTs"; //context示例

  //开始处理实际的函数
  //-----USESTATE
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(""); //无论谁与智能合约交互或与应用程序交互，我们都想要获得他们钱包的地址
  const router = useRouter();

  //这个函数是用来检查用户(钱包)是否与应用程序正常连接
  //---CHECK IF WALLET IS CONNECTED
  const checkIfWalletConnected = async () => {
    try {
      //首先检查是否安装了Metamask
      if (!window.ethereum)
        return setOpenError(true), setError("Install Metamask");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      }); //通过Metamask得到账户数组,故可能有多个账户

      //我们必须建立一个筛选条件
      //如果说账户数组中有对象的话
      if (accounts.length) {
        setCurrentAccount(accounts[0]); //使用第一个账户,并改变状态变量;
      } else {
        setError("No Account Found");
        setOpenError(true);
      }
    } catch (error) {
      setError("Something wrong while connecting to wallet");
      setOpenError(true);
    }
  };

  //每次我们一打开页面就想要调用这个函数
  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  //这个函数允许用户点击按钮并连接钱包
  //---CONNECT WALLET FUNCTION
  const connectWallet = async () => {
    try {
      //首先检查是否安装了Metamask
      if (!window.ethereum)
        return setOpenError(true), setError("Install Metamask");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      }); //换一种方法通过Metamask得到账户数组

      setCurrentAccount(accounts[0]); //设置状态变量
      // window.location.reload(); //一旦我们连接到了一个账户,我们必须重新加载页面
    } catch (error) {
      setError("Error while connecting to wallet");
      setOpenError(true);
    }
  };

  //这个函数允许我们在上传图像后将图像上传到IPFS,我们将返回图像并正常显示它
  //这个函数将接收一个file,所以每当我们调用这个函数的时候,我们都会从中获取url
  //例如当有人使用DropZone时,他们会拖放图像,我们会得到那些图像的路径
  //---UPLOAD TO IPFS FUNCTION
  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file }); //在客户端上添加文件路径
      const url = `${subdomain}/ipfs/${added.path}`; //通过文件路径的动态变化来获得我们的url
      return url; //从上传页面的IPFS中获取该url
    } catch (error) {
      setError("Error Uploading to IPFS");
      setOpenError(true);
    }
  };

  //这个函数需要接收一些参数,例如表单输入
  //表单输入是一个对象，它会有前端应用程序中name,price,descriptions这些所有的数据(也可以直接使用数据来替换表单输入)
  //---CREATENFT FUNCTION
  const createNFT = async (name, price, image, description, router) => {
    // const { name, description, price } = formInput; //首先从表单输入中解构数据
    //我们必须检查创建该NFT的用户是否提供了创建NFT所需的所有数据
    if (!name || !description || !price || !image)
      return setError("Data Is Missing"), setOpenError(true);

    //一旦用户提供我们想要的所有数据,进一步执行该函数
    const data = JSON.stringify({ name, description, image }); //将解构出的数据转换为json

    try {
      const added = await client.add(data); //在客户端上添加数据
      const url = `https://infura-ipfs.io/ipfs/${added.path}`; //这个url将会包含所有信息,例如name,description等

      await createSale(url, price); //调用createSale函数并传递url和price
      //这个函数负责创建sale，并且这个函数将在内部执行
      router.push("/searchPage"); //一旦我们成功创建了NFT，我们就希望重定向到searchPage
    } catch (error) {
      setError("Error while creating NFT");
      setOpenError(true);
    }
  };

  //这个函数需要接收url,price,isReselling,id
  //因为我们不想一遍又一遍地编写相同的代码,isReselling允许我们做一些检查应该执行哪个函数以及用户正在调用哪个函数
  //---CREATESALE FUNCTION
  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      console.log(url, formInputPrice, isReselling, id);
      const price = ethers.utils.parseUnits(formInputPrice, "ether"); //把price转换成以太币
      const contract = await connectingWithSmartContract(); //在这个contract变量上拥有智能合约的所有属性(因为我们要与智能合约进行实际的交互)

      const listingPrice = await contract.getListingPrice(); //我们希望在用户创建/转售NFT时获得佣金,在这里调用的是智能合约中的函数

      //我们必须做一个检查,如果用户不转售他们现有的NFT,反而在创建新的NFT的话,我们会执行createToken函数(来自智能合约)并定义listingPrice
      //如果用户尝试转售他们的NFT,我们会执行resellToken函数(来自智能合约)并定义listingPrice
      const transaction = !isReselling
        ? await contract.createToken(url, price, {
            value: listingPrice.toString(),
          })
        : await contract.resellToken(id, price, {
            value: listingPrice.toString(),
          }); //根据是否转售来创建交易
      await transaction.wait(); //确保这个交易被写入区块中
    } catch (error) {
      setError("error while creating sale");
      setOpenError(true);
    }
  };

  //这个函数将获得在应用程序上创建的所有NFT(应该是获得一个数组)
  //---FETCHNFTS FUNCTION
  const fetchNFTs = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(); //我们需要一个provider来与智能合约之间通信
      const contract = fetchContract(provider); //获取智能合约对象

      const data = await contract.fetchMarketItems(); //获取智能合约中所有未售出的NFT的信息(此时data是一个结构体数组)
      console.log(data);

      //异步函数就是指返回值为Promise的函数
      //在Promise返回给调用者的时候,操作往往还没有完成,但Promise对象可以让我们操作最终完成时对其进行处理(无论成功还是失败)。
      //解析Promise
      const items = await Promise.all(
        //将结构体中的元素结解构出来(MarketItem数组)
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId); //通过tokenId获得tokenURI
            //结构data
            const {
              data: { image, name, description },
            } = await axios.get(tokenURI); //通过tokenURI来寻找的需要的API,从API中解构数据
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            ); //将price转换为未格式化的

            //我们有两种返回数据的方法
            //第一种是一个个返回并保存在useState中
            //第二种是返回整个数据,后续可以在组件中呈现(我们选择这一种)
            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );

      return items;
    } catch (error) {
      setError("Error while fetching NFTS");
      setOpenError(true);
    }
  };

  //每次重新加载页面的时候都调用这个函数
  useEffect(() => {
    fetchNFTs();
  }, []);

  //这个函数用来获取与单个用户相关的所有NFT
  //我们必须定义type作为参数,因为我们必须获取两种类型的NFT，一种是由用户所持有的NFT
  //另一种是用户正在售卖的NFT
  //---FETCHING MY NFT OR LISTED NFTs
  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      const contract = await connectingWithSmartContract(); //在这个contract变量上拥有智能合约的所有属性

      //使用三目运算符,根据不同的NFT类型来获取相应的数据
      //卖家单独显示关于正在售卖的NFT的信息(fetchItemsListed)
      //显示用户所持有的所有NFT的信息(fetchMyNFT)
      const data =
        type == "fetchItemsListed"
          ? await contract.fetchItemsListed()
          : await contract.fetchMyNFTs();

      //解析Promise
      const items = await Promise.all(
        data.map(
          //将结构体中的元素结结构出来(MarketItem数组)
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId); //通过tokenId获得tokenURI
            //结构data
            const {
              data: { image, name, description },
            } = await axios.get(tokenURI); //通过tokenURI来寻找的需要的API,从API中解构数据
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            ); //将price转换为未格式化的

            //我们有两种返回数据的方法
            //第一种是一个个返回并保存在useState中
            //第二种是返回整个数据,后续可以在组件中呈现(我们选择这一种)
            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );
      return items;
    } catch (error) {
      setError("Error while fetching listed NFTs");
      setOpenError(true);
    }
  };
  //在上面的这两个fetch函数中我们与智能合约交互,使用axios提取数据,解析Promise,从智能合约中获取数据,通过这样的操作来展示在应用程序上面
  //似乎是因为函数在没有结束之前,await的函数返回值都是以Promise形式存在的

  useEffect(() => {
    fetchMyNFTsOrListedNFTs();
  }, []);

  //这个函数将允许用户购买NFT
  //输入参数是nft,也就是说它需要获得NFT的所有数据
  //---BUY NFTs FUNCTION
  const buyNFT = async (nft) => {
    try {
      const contract = await connectingWithSmartContract(); //获得合约变量,拥有智能合约的所有属性
      const price = ethers.utils.parseUnits(nft.price.toString(), "ether"); //转换price

      //这个函数与createSale中调用的resellToken函数(用于创建订单)配合使用
      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      }); //这个函数相当于创建订单后的正式付款(这样用户就可以正常购买NFT)

      await transaction.wait(); //确保交易被写到区块中
      router.push("/author");
    } catch (error) {
      setError("Error while buying NFT");
      setOpenError(true);
    }
  };

  return (
    //我们在value中传递的任何数据在整个应用程序中都可用，每个组件都可以调用这些数据
    //现在我们是在搭建框架，之后我们会利用这个框架来获取和共享数据
    <NFTMarketplaceContext.Provider
      value={{
        checkIfWalletConnected,
        connectWallet,
        uploadToIPFS,
        createNFT,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        createSale,
        titleData,
        setOpenError,
        openError,
        error,
        currentAccount,
      }} //蓝色的似乎是可以直接用的变量,黄色的都是需要调用的函数
    >
      {children}
    </NFTMarketplaceContext.Provider>
  );
};
//当我们把所有的函数都编写好之后,我们就可以启动智能合约,启动我们的NFT交易市场
//我们现在就已经完成了整个NFT交易所context的逻辑,我们所要做的就是使用这些函数并调用我们想要渲染数据,上传NFT的组件
