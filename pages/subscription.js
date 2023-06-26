import React from "react";

//INTERNAL IMPORT
import Style from "../styles/subscription.module.css";
import Subscription from "../Subscription/Subscription";

const subscription = () => {
  const subscriptionArray = [
    {
      plan: "启动套餐",
      price: "$5/月",
      popular: "",
      service: ["自动报告", "处理速度更快", "定制化"],
      info: "Literally you probably haven't heard of them jean shorts.",
    },
    {
      plan: "基本套餐",
      price: "$15/月",
      popular: "POPULAR",
      service: ["启动套餐中的一切", "100 次构建", "进度报告", "高级支持"],

      info: "Literally you probably haven't heard of them jean shorts.",
    },
    {
      plan: "PLUS套餐",
      price: "$25/月",
      popular: "",
      service: ["基本套餐中的一切", "无限构建", "高级分析", "公司评价"],

      info: "Literally you probably haven't heard of them jean shorts.",
    },
  ];
  return (
    <div className={Style.Subscription}>
      <div className={Style.Subscription_box}>
        <div className={Style.Subscription_box_info}>
          <h1>💎 订阅计划</h1>
          <p>定价可满足任何规模公司的需求</p>
        </div>

        <div className={Style.Subscription_box_box}>
          {subscriptionArray.map((el, i) => (
            // 这里写成i={i}和i={1}有什么区别
            <Subscription key={i + 1} i={i} el={el} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default subscription;
