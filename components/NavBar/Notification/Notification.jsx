import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Notification.module.css";
import images from "../../../img";

const Notification = () => {
  return (
    <div className={Style.notification}>
      <p>通知</p>
      <div className={Style.notification_box}>
        <div className={Style.notification_box_img}>
          <Image
            src={images.user1}
            alt="profile image"
            width={50}
            height={50}
            className={Style.notification_box_img}
          />
        </div>
        {/* 当我们基于整个功能从api获取数据时，整个数据将针对不同的用户动态变化 */}
        <div className={Style.notification_box_info}>
          <h4>刘宝梁</h4>
          {/* 用户的地址 */}
          <p>等待您的下一步操作...</p>
          <p></p>
          {/* 在收到通知前的这段时间里,仍然可以更新信息*/}
          <small>三分钟前</small>
        </div>
        <span className={Style.notification_box_new}></span>
      </div>
    </div>
  );
};

export default Notification;
