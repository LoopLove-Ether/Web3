import React from "react";
import Image from "next/image";
import { BsCircleFill } from "react-icons/bs";

//INTERNAL IMPORT
import Style from "./Category.module.css";
import images from "../../img";

const Category = () => {
  const CategoryArray = [
    images.creatorbackground1,
    images.creatorbackground10,
    images.creatorbackground11,
    images.creatorbackground2,
    images.creatorbackground4,
    images.creatorbackground5,
  ];
  // 我们在部署应用程序时必须要压缩我们的图像,不然的话加载时间太长的话十分影响用户体验
  return (
    <div className={Style.box_category}>
      <div className={Style.category}>
        {CategoryArray.map((el, i) => (
          <div className={Style.category_box} key={1 + 1}>
            <Image
              src={el}
              className={Style.category_box_img}
              alt="Background image"
              width={350}
              height={150}
            />
            <div className={Style.category_box_title}>
              <span>
                <BsCircleFill />
              </span>
              <div className={Style.category_box_title_info}>
                <h4>Web3</h4>
                <small>2008 BTCs</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
