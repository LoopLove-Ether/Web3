import React from "react";
import Image from "next/image";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { RiSendPlaneFill } from "react-icons/ri";
import { DiJqueryLogo } from "react-icons/di";
//INTERNAL IMPORT
import Style from "./Footer.module.css";
import images from "../../img";
import { Discover, HelpCenter } from "../NavBar/index";

const Footer = () => {
  return (
    <div className={Style.footer}>
      <div className={Style.footer_box}>
        <div className={Style.footer_box_social}>
          <div className={Style.logo}>
            <a href="/">
              {/* <Image
                src={images.logo}
                alt="NFT MARKET PLACE"
                width={100}
                height={100}
              /> */}
              <DiJqueryLogo />
            </a>
          </div>
          <p>
            世界上第一个也是最大的加密产品数字市场.
            购买、出售和发现独家数字项目.
          </p>

          <div className={Style.footer_social}>
            <a href="#">
              <TiSocialFacebook />
            </a>
            <a href="#">
              <TiSocialLinkedin />
            </a>
            <a href="#">
              <TiSocialTwitter />
            </a>
            <a href="#">
              <TiSocialYoutube />
            </a>
            <a href="#">
              <TiSocialInstagram />
            </a>
          </div>
        </div>

        <div className={Style.footer_box_discover}>
          <h3>发现</h3>
          <Discover />
        </div>

        <div className={Style.footer_box_help}>
          <h3>帮助中心</h3>
          <HelpCenter />
        </div>
        <div className={Style.subscribe}>
          <h3>订阅</h3>
          <div className={Style.subscribe_box}>
            <input type="email" placeholder="输入你的邮箱 *" />
            <RiSendPlaneFill className={Style.subscribe_box_send} />
          </div>
          <div className={Style.subscribe_box_info}>
            <p>
              发现、收集和销售非凡的加密产品 世界上第一个也是最大的加密产品市场
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
