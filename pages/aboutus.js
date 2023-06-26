import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "../styles/aboutus.module.css";
import { Brand } from "../components/componentsindex";
import images from "../img";

const aboutus = () => {
  const founderArray = [
    {
      name: "刘宝翘",
      position: "CFO",
      images: images.founder1,
    },
    {
      name: "刘宝蹲",
      position: "CTO",
      images: images.founder2,
    },
    {
      name: "刘宝梁",
      position: "CEO",
      images: images.founder3,
    },
    {
      name: "刘宝猪",
      position: "COO",
      images: images.founder4,
    },
  ];

  const factsArray = [
    {
      title: "10亿",
      info: "文章已在全球公开（截至2023年6月26日）",
    },
    {
      title: "100,000",
      info: "注册用户数量（截至2023年6月26日）",
    },
    {
      title: "220+",
      info: "我们业务覆盖的国家和地区（截至2023年6月26日）",
    },
  ];
  return (
    <div className={Style.aboutus}>
      <div className={Style.aboutus_box}>
        <div className={Style.aboutus_box_hero}>
          <div className={Style.aboutus_box_hero_left}>
            <h1>👋 关于我们.</h1>
            <p>
              我们是独立的开发团队，每一天我们都在创造独特的、世界一流的节目和内容，教育和娱乐世界各地数百万人
            </p>
          </div>
          <div className={Style.aboutus_box_hero_right}>
            <Image src={images.hero2} />
          </div>
        </div>

        <div className={Style.aboutus_box_title}>
          <h2>⛱ 创始人</h2>
        </div>

        <div className={Style.aboutus_box_founder}>
          <div className={Style.aboutus_box_founder_box}>
            {founderArray.map((el, i) => (
              <div className={Style.aboutus_box_founder_box_img}>
                <Image
                  src={el.images}
                  alt={el.name}
                  width={265}
                  height={265}
                  className={Style.aboutus_box_founder_box_img_img}
                />
                <h3>{el.name}</h3>
                <p>{el.position}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={Style.aboutus_box_title}>
          <h2>🚀 速览</h2>
        </div>

        <div className={Style.aboutus_box_facts}>
          <div className={Style.aboutus_box_facts_box}>
            {factsArray.map((el, i) => (
              <div className={Style.aboutus_box_facts_box_info}>
                <h3>{el.title}</h3>
                <p>{el.info}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Brand />
    </div>
  );
};

export default aboutus;
