import React, { useContext, useState, useEffect } from "react";

//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import {
  HeroSection,
  Service,
  BigNFTSlider,
  Subscribe,
  Title,
  Category,
  Filter,
  NFTCard,
  Collection,
  FollowerTab,
  AudioLive,
  Slider,
  Brand,
  // Video,
  Loader,
} from "../components/componentsindex";

const Home = () => {
  return (
    <div className={Style.homePage}>
      {/* <HeroSection /> */}
      {/* <Service /> */}
      <BigNFTSlider />
      <Title heading="音乐收藏品" paragraph="发现各个主题中最出色的加密音乐" />
      <AudioLive />
      <Slider />
      <Collection />
      <Title heading="特色 NFTs" paragraph="发现各个主题中最优秀的NFT" />
      <NFTCard />
      <Title heading="按类别搜索" paragraph="探索最具特色的加密产品" />
      <Category />
      {/* <Subscribe /> */}
      <Brand />
      {/* <Video /> */}
    </div>
  );
};

export default Home;
