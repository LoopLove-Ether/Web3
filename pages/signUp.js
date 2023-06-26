import React from "react";

//INTERNAL IMPORT
import Style from "../styles/login.module.css";
import LoginAndSignUp from "../loginAndSignUp/loginAndSignUp";

const signUp = () => {
  return (
    <div className={Style.login}>
      <div className={Style.login_box}>
        <h1>注册</h1>
        <LoginAndSignUp />
        <p className={Style.login_box_para}>
          新用户? <a href="#">创建一个账户</a>
        </p>
      </div>
    </div>
  );
};

export default signUp;
