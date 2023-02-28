import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Banner.module.css";
import images from "../../img";

const Banner = ({ bannerImage }) => {
  return (
    <div className={Style.banner}>
      <div className={Style.banner_img}>
        <Image
          src={bannerImage}
          alt="background"
          width={1522}
          height={300}
          // object-fit:cover;
        />
      </div>

      {/* 移动设备 */}
      {/* 我们有两个选项卡 */}
      {/* 我们想要在PC上展示上方渲染的图片,在移动设备上展示下方渲染的图片 */}
      <div className={Style.banner_img_mobile}>
        <Image
          src={bannerImage}
          alt="background"
          width={1522}
          height={900}
          // object-fit:cover;
        />
      </div>
    </div>
  );
};

export default Banner;
