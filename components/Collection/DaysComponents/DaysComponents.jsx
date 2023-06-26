import React from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";

//INTERNAL IMPORT
import Style from "./DaysComponents.module.css";
import images from "../../../img";

const DaysComponents = ({ el, i }) => {
  return (
    <div className={Style.daysComponent}>
      <div className={Style.daysComponent_box}>
        <div className={Style.daysComponent_box_img}>
          <Image
            src={el.background}
            className={Style.daysComponent_box_img_img}
            alt="profile background"
            width={300}
            height={200}
          />
        </div>

        {/* 当我们从API获得数据时,我们将创建一个子图像类别,我们将在其中添加下面的附加图像 */}
        {/* 现在暂时不添加,只是做一个这样的布局 */}
        <div className={Style.daysComponent_box_profile}>
          <Image
            src={el.background}
            alt="profile"
            width={100}
            height={100}
            className={Style.daysComponent_box_img_1}
          />
          <Image
            src={el.background}
            alt="profile"
            width={100}
            height={100}
            className={Style.daysComponent_box_img_2}
          />
          <Image
            src={el.background}
            alt="profile"
            width={100}
            height={100}
            className={Style.daysComponent_box_img_3}
          />
        </div>

        <div className={Style.daysComponent_box_title}>
          <h2>神奇收藏品</h2>
          <div className={Style.daysComponent_box_title_info}>
            <div className={Style.daysComponent_box_title_info_profile}>
              <Image
                src={el.user}
                alt="profile"
                width={30}
                height={30}
                className={Style.daysComponent_box_title_info_profile_img}
              />

              <p>
                卖家
                <span>
                  刘宝梁
                  <small>
                    <MdVerified />
                  </small>
                </span>
              </p>
            </div>

            <div className={Style.daysComponent_box_title_info_price}>
              <small>1.255 ETH</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaysComponents;
