//在这个文件中我们将导入NavBar文件夹下的所有组件
import React, { useState, useContext } from "react";
import Image from "next/image";
//----IMPORT ICON
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";
import Link from "next/link"; //希望在使用创建NFT按钮时将用户重定向到UploadNFT页面
import { useRouter } from "next/router";
import { DiJqueryLogo } from "react-icons/di";

//INTERNAL IMPORT
import Style from "./NavBar.module.css";
import { Discover, HelpCenter, Notification, Profile, SideBar } from "./index";
import { Button, Error } from "../componentsindex";
import images from "../../img";

//IMPORT FROM SMART CONTRACT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const NavBar = () => {
  //----USESTATE COMPONNTS
  //我们在这里获取每个组件的状态,并且可以控制它们的开关。
  const [discover, setDiscover] = useState(false);
  const [help, setHelp] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const router = useRouter();

  // //定义一个函数
  // //调用此函数时我们会收到e这样的形参
  // //当有人调用此函数的时候会得到对应的文本信息,
  // //一旦我们有了文本信息,我们就想要匹配它,匹配它后我们就会显示对应的组件
  // const openMenu = (e) => {
  //   const btnText = e.target.innerText;
  //   if (btnText == "Discover") {
  //     setDiscover(true);
  //     setHelp(false);
  //     setNotification(false);
  //     setProfile(false);
  //   } else if (btnText == "Help Center") {
  //     setDiscover(false);
  //     setHelp(true);
  //     setNotification(false);
  //     setProfile(false);
  //   } else {
  //     setDiscover(false);
  //     setHelp(false);
  //     setNotification(false);
  //     setProfile(false);
  //   }
  // };

  const openDiscover = () => {
    if (!discover) {
      setNotification(false);
      setDiscover(true);
      setHelp(false);
      setProfile(false);
    } else {
      setDiscover(false);
    }
  };

  const openHelpCenter = () => {
    if (!help) {
      setNotification(false);
      setDiscover(false);
      setHelp(true);
      setProfile(false);
    } else {
      setHelp(false);
    }
  };

  const openNotification = () => {
    if (!notification) {
      setNotification(true);
      setDiscover(false);
      setHelp(false);
      setProfile(false);
    } else {
      setNotification(false);
    }
  };

  const openProfile = () => {
    if (!profile) {
      setProfile(true);
      setHelp(false);
      setDiscover(false);
      setNotification(false);
    } else {
      setProfile(false);
    }
  };

  const openSideBar = () => {
    if (!openSideMenu) {
      setOpenSideMenu(true);
    } else {
      setOpenSideMenu(false);
    }
  };

  //和index.js中类似的操作
  //SMART CONTRACT SECTION
  const { currentAccount, connectWallet, openError } = useContext(
    NFTMarketplaceContext
  );

  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
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
          {/* 搜索输入框 */}
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input type="text" placeholder="Search NFT" />
              <BsSearch onClick={() => {}} className={Style.search_icon} />
            </div>
          </div>
        </div>

        {/* //END OF LEFT SECTION */}
        <div className={Style.navbar_container_right}>
          <div className={Style.navbar_container_right_discover}>
            {/* DISCOVER MENU */}
            <p onClick={(e) => openDiscover()}>Discover</p>
            {/* discover如果为false,则这个组件不会显示 */}
            {discover && (
              <div className={Style.navbar_container_right_discover_box}>
                <Discover />
              </div>
            )}
          </div>

          {/* HELP CENTER MENU */}
          <div className={Style.navbar_container_right_help}>
            <p onClick={(e) => openHelpCenter()}>Help Center</p>
            {help && (
              <div className={Style.navbar_container_right_help_box}>
                <HelpCenter />
              </div>
            )}
          </div>

          {/* NOTIFICATION */}
          <div className={Style.navbar_container_right_notify}>
            <MdNotifications
              className={Style.notify}
              onClick={() => openNotification()}
            />
            {notification && <Notification />}
          </div>

          {/* 添加一个动态按钮,如果用户没有连接到应用程序中,我们希望显示一个不同的按钮来连接 */}
          {/* 如果用户已经连接到应用程序中,我们想要显示另一个不同的按钮来创建NFT */}
          {/* 希望在使用创建NFT按钮时将用户重定向到UploadNFT页面 */}
          {/* CREATE BUTTON SECTION */}
          <div className={Style.navbar_container_right_button}>
            {currentAccount == "" ? (
              <Button btnName="Connect" handleClick={() => connectWallet()} />
            ) : (
              <Button
                btnName="Create"
                handleClick={() => router.push("/uploadNFT")}
              />
            )}
          </div>

          {/* USER PROFILE */}

          <div className={Style.navbar_container_right_profile_box}>
            <div className={Style.navbar_container_right_profile}>
              <Image
                src={images.user1}
                alt="Profile"
                width={40}
                height={40}
                onClick={() => openProfile()}
                className={Style.navbar_container_right_profile}
              />
              {/* 稍后，当我们连接到后端时，我们将在这个组件中发送道具 */}
              {/* 动态数据我们可以轻松地删除/使用 */}
              {profile && <Profile currentAccount={currentAccount} />}
            </div>
          </div>

          {/* MENU BUTTON */}
          {/* 这个组件将只显示在移动设备上 */}
          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight
              className={Style.menuIcon}
              onClick={() => openSideBar()}
            />
          </div>
        </div>
      </div>

      {/* SIDBAR CPMPONE/NT */}
      {openSideMenu && (
        <div className={Style.sideBar}>
          {/* 通过一个十字按钮控制sidebar的开关 */}
          <SideBar
            setOpenSideMenu={setOpenSideMenu}
            currentAccount={currentAccount}
            connectWallet={connectWallet}
          />
        </div>
      )}

      {openError && <Error />}
    </div>
  );
};

export default NavBar;
