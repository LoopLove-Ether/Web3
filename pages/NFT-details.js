import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router"; //在IPFS的url中有我们所有的数据

//INTERNAL IMPORT
import { Button, Category, Brand } from "../components/componentsindex";
import NFTDetailsPage from "../NFTDetailsPage/NFTDetailsPage";

//IMPORT SMART CONTRACT DATA
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
const NFTDetails = () => {
  const { currentAccount } = useContext(NFTMarketplaceContext);

  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
  }); //这个nft将以对象的形式出现(这些都是从router获取的数据)

  const router = useRouter();

  //每次加载浏览器的时候,首先检查router(也就是url)准备好了没有
  //如果没有准备好就直接从函数返回,如果准备好的话我们就获取数据并设置到NFT市场
  useEffect(() => {
    if (!router.isReady) return;
    setNft(router.query); //在query中我们有所有的数据
  }, [router.isReady]);

  return (
    <div>
      <NFTDetailsPage nft={nft} />
      <Category />
      <Brand />
    </div>
  );
};

export default NFTDetails;
