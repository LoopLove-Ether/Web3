import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GrClose } from "react-icons/gr"; //用来关闭的十字图标
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./SideBar.module.css";
import images from "../../../img";
import Button from "../../Button/Button";

//setOpenSideMenu这个参数是从NavBar.jsx中发送的
//通过这种方式我们可以很容易地从我们的导航栏中的侧边栏组件更改状态
const SideBar = ({ setOpenSideMenu, currentAccount, connectWallet }) => {
  //------USESTATE
  const [openDiscover, setOpenDiscover] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);

  const router = useRouter();

  //--------DISCOVER NAVIGATION MENU
  const discover = [
    {
      name: "市场",
      link: "collection",
    },
    {
      name: "搜索",
      link: "search",
    },
    {
      name: "卖家信息",
      link: "author-profile",
    },
    {
      name: "商品细节",
      link: "NFT-details",
    },
    {
      name: "账户设置",
      link: "account-setting",
    },
    // {
    //   name: "Connect Wallet",
    //   link: "connect-wallet",
    // },
    {
      name: "博客",
      link: "blog",
    },
  ];
  //------HELP CENTER MENU
  const helpCenter = [
    {
      name: "关于我们",
      link: "about",
    },
    {
      name: "联系我们",
      link: "contact-us",
    },
    {
      name: "注册(可选)",
      link: "sign-up",
    },
    {
      name: "登陆(可选)",
      link: "sign-in",
    },
    //subscription我们想要设置为可选的,这样可以为NFT创建者提供额外功能
    {
      name: "订阅",
      link: "subscription",
    },
  ];

  const openDiscoverMenu = () => {
    if (!openDiscover) {
      setOpenDiscover(true);
    } else {
      setOpenDiscover(false);
    }
  };

  const openHelpMenu = () => {
    if (!openHelp) {
      setOpenHelp(true);
    } else {
      setOpenHelp(false);
    }
  };

  const closeSideBar = () => {
    setOpenSideMenu(false);
  };

  return (
    <div className={Style.sideBar}>
      <GrClose
        className={Style.sideBar_closeBtn}
        onClick={() => closeSideBar()}
      />

      <div className={Style.sideBar_box}>
        <Image src={images.logo} alt="logo" width={150} height={150} />
        <p>
          Discover the most outstanding articles on all topices of NFT & write
          your own stories and share them
        </p>
        {/* 下面要展示所有媒体图标 */}
        <div className={Style.sideBar_social}>
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
      {/* DISCOVER COMPONENT */}
      <div className={Style.sideBar_menu}>
        <div>
          <div
            className={Style.sideBar_menu_box}
            onClick={() => openDiscoverMenu()}
          >
            <p>Discover</p>
            <TiArrowSortedDown />
          </div>

          {openDiscover && (
            <div className={Style.sideBar_discover}>
              {discover.map((el, i) => (
                <p key={i + 1}>
                  <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
                </p>
              ))}
            </div>
          )}
        </div>
        {/* HELPCENTER COMPONENT */}
        <div>
          <div
            className={Style.sideBar_menu_box}
            onClick={() => openHelpMenu()}
          >
            <p>Help Center</p>
            <TiArrowSortedDown />
          </div>

          {openHelp && (
            <div className={Style.sideBar_discover}>
              {helpCenter.map((el, i) => (
                <p key={i + 1}>
                  <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 两个button,一个用于连接钱包,一个用于创建NFT */}
      {/* 添加一个动态按钮,如果用户没有连接到应用程序中,我们希望显示一个不同的按钮来连接 */}
      {/* 如果用户已经连接到应用程序中,我们想要显示另一个不同的按钮来创建NFT */}
      <div className={Style.sideBar_button}>
        {currentAccount == "" ? (
          <Button btnName="Connect" handleClick={() => connectWallet()} />
        ) : (
          <Button
            btnName="Create"
            handleClick={() => router.push("/uploadNFT")}
          />
        )}
      </div>
    </div>
  );
};

export default SideBar;
