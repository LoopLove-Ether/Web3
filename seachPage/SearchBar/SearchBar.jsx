import React, { useEffect, useState } from "react";
import { BsSearch, BsArrowRight } from "react-icons/bs";

//INTERNAL IMPORT
import Style from "./SearchBar.module.css";

const SearchBar = ({ onHandleSearch, onClearSearch }) => {
  //这两个状态变量和下面这两个useEffect看不懂
  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState(search); //searchItem可以理解为搜索栏里的内容抽象出来作为状态变量,search代表什么呢

  //搜索计时和搜索栏新功能在加载页面的时候就直接调用了
  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchItem), 1000); //我们可以分离时间,搜索需要1s
    return () => clearTimeout(timer); //一旦搜索成功,重置时间
  }, [searchItem]);

  useEffect(() => {
    if (search) {
      onHandleSearch(search);
    } else {
      onClearSearch();
    }
  }, [search]);

  return (
    <div className={Style.SearchBar}>
      <div className={Style.SearchBar_box}>
        <BsSearch className={Style.SearchBar_box_icon} />
        <input
          type="text"
          placeholder="Type your keyword.."
          onChange={(e) => setSearchItem(e.target.value)}
          value={searchItem}
        />
        <BsArrowRight className={Style.SearchBar_box_icon} />
      </div>
    </div>
  );
};

export default SearchBar;
