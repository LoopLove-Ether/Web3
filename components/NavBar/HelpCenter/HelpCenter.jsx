import React from "react";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./HelpCenter.module.css";

const HelpCenter = () => {
  const helpCenter = [
    {
      name: "关于我们",
      link: "aboutus",
    },
    {
      name: "联系我们",
      link: "contactus",
    },
    {
      name: "注册(可选)",
      link: "signUp",
    },
    {
      name: "登陆(可选)",
      link: "login",
    },
    //subscription我们想要设置为可选的,这样可以为NFT创建者提供额外功能
    {
      name: "订阅",
      link: "subscription",
    },
  ];
  return (
    <div className={Style.box}>
      {helpCenter.map((el, i) => (
        <div className={Style.helpCenter} key={i + 1}>
          <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default HelpCenter;
