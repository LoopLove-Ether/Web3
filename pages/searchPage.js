import React, { useEffect, useState, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/searchPage.module.css";
import { Slider, Brand, Loader } from "../components/componentsindex";
import { SearchBar } from "../seachPage/searchPageIndex";
import { Filter } from "../components/componentsindex";
import { NFTCardTwo, Banner } from "../collectionPage/collectionindex";
import images from "../img";

//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const searchPage = () => {
  const { fetchNFTs, setError } = useContext(NFTMarketplaceContext);
  //这两个状态变量到底代表什么
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  //每次重新加载页面的时候都调用这个函数
  //解析Promise
  useEffect(() => {
    try {
      fetchNFTs().then((items) => {
        setNfts(items.reverse()); //将从IPFS解析得到的items数组倒置放在nfts内
        setNftsCopy(items); //我们不想更改源数组,所以在这里更改它的副本
      });
    } catch (error) {
      //这个错误是在我们从IPFS中,从智能合约中获取数据时发生的
      //我们允许用户重新加载浏览器,我们将告诉用户重新加载浏览器,这样可以解决很多未知的错误.
      setError("Please reload the browser");
    }
  }, []);

  //为搜索栏创建其他功能
  //当任何人输入NFT名称时,我们希望显示对应的NFT
  const onHandleSearch = (value) => {
    const filteredNFTS = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    ); //获取name后转换为小写,一旦我们有了小写的name之后,我们必须调用includes函数来匹配数据(其他人输入的value)

    //filteredNFTS.length === 0是匹配失败
    if (filteredNFTS.length === 0) {
      setNfts(nftsCopy);
    } else {
      setNfts(filteredNFTS);
    }
  };

  //当搜索栏中没有任何内容时,我们必须显示数据
  const onClearSearch = () => {
    //如果nfts数组中存在元素的话
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  // const collectionArray = [
  //   images.nft_image_9,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_4,
  //   images.nft_image_5,
  //   images.nft_image_6,
  //   images.nft_image_7,
  //   images.nft_image_8,
  // ];

  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar
        onHandleSearch={onHandleSearch}
        onClearSearch={onClearSearch}
      />
      <Filter />
      {/* 因为把NFT的一切上传到Infura上面托管需要花费时间,所以在这里设置Loader组件 */}
      {nfts.length == 0 ? <Loader /> : <NFTCardTwo NFTData={nfts} />}
      <Slider />
      <Brand />
    </div>
  );
};

export default searchPage;
