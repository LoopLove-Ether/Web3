import React from "react";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./Discover.module.css";

const Discover = () => {
  //必须获取演示数据,所以在这里我要做的是获取一个数组,在数组中有页面的名称和路由器

  //--------DISCOVER NAVIGATION MENU
  //在这个数组中我们有每个菜单的对象
  //我们要根据这些名称构建页面的url
  //这些将是在我们不同的discover组件中显示的菜单
  const discover = [
    {
      name: "市场",
      link: "collection",
    },
    {
      name: "搜索",
      link: "searchPage",
    },
    {
      name: "卖家信息",
      link: "author",
    },
    {
      name: "商品细节",
      link: "NFT-details",
    },
    {
      name: "账户设置",
      link: "account",
    },
    {
      name: "上传商品",
      link: "uploadNFT",
    },
    //为用户提供多个用于连接他们的钱包的选项
    // {
    //   name: "Connect Wallet",
    //   link: "connectWallet",
    // },
    {
      name: "博客",
      link: "blog",
    },
  ];
  // 在接下来的div中我们将遍历整个discover菜单
  return (
    <div>
      {discover.map((el, i) => (
        // 每个菜单都有唯一的key
        <div key={i + 1} className={Style.discover}>
          <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Discover;
