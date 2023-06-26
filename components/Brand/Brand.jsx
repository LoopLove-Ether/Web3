import React from "react";
import Image from "next/image";
import { DiJqueryLogo } from "react-icons/di";

//INTERNAL IMPORT
import Style from "./Brand.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex";

const Brand = () => {
  return (
    <div className={Style.Brand}>
      <div className={Style.Brand_box}>
        <div className={Style.Brand_box_left}>
          <div className={Style.Brand_logo}>
            <a href="/">
              <DiJqueryLogo />
            </a>
          </div>
          <h1>使用 Ciscrypt 赚取免费加密货币</h1>
          <p>一家具有领导力和启发力的创意机构</p>

          <div className={Style.Brand_box_left_btn}>
            <Button btnName="上架" handleClick={() => {}} />
            <Button btnName="发现" handleClick={() => {}} />
          </div>
        </div>
        <div className={Style.Brand_box_right}>
          <Image src={images.eran} alt="brand logo" width={800} height={600} />
        </div>
      </div>
    </div>
  );
};

export default Brand;
