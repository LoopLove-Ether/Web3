import React from "react";

//INTERNAL IMPORT
import Style from "./Button.module.css";

//btnName是按钮的名字,handleClick是按钮的功能,classStyle参数意味着这个按钮的样式是动态变化的
const Button = ({ btnName, handleClick, icon, classStyle }) => {
  return (
    <div className={Style.box}>
      <button
        // 动态代码块意味着样式可以随着参数进行改变(这就是在单个div中使用多个className的方式)
        className={`${Style.button} ${classStyle}`}
        onClick={() => handleClick()}
      >
        {icon} {btnName}
      </button>
    </div>
  );
};

export default Button;
