import React from "react";

//INTERNAL IMPORT
import Style from "../styles/collection.module.css";
import images from "../img";
import {
  Banner,
  CollectionProfile,
  NFTCardTwo,
} from "../collectionPage/collectionindex";
import { Slider, Brand } from "../components/componentsindex";
import Filter from "../components/Filter/Filter"; //单独导入是因为我们不想导入Button和title

const collection = () => {
  const collectionArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_4,
    images.nft_image_5,
    images.nft_image_6,
    images.nft_image_7,
    images.nft_image_8,
  ];
  return (
    <div className={Style.collection}>
      <Banner bannerImage={images.creatorbackground1} />
      {/* 当我们从API中获得数据时才向collectionProfile组件中发送参数 */}
      <CollectionProfile />
      <Filter />
      <NFTCardTwo NFTData={collectionArray} />
      <Slider />
      <Brand />
    </div>
  );
};

export default collection;
