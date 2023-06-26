import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion"; //这个liberary将允许我们在Slider中添加弹跳效果
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./Slider.module.css";
import SliderCard from "./SliderCard/SliderCard";
import images from "../../img";

const Slider = () => {
  const FollowingArray = [
    {
      background: images.creatorbackground3,
      user: images.user3,
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
    },
    {
      background: images.creatorbackground1,
      user: images.user1,
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
    },
  ];
  const [width, setWidth] = useState(0); //滑块的实际宽度
  const dragSlider = useRef();

  // 获取数据并更新每次滑动的最小长度(也就是边框的长度)
  //scrollWidth 属性是一个只读属性，它返回该元素的像素宽度，高度包含内边距（padding），不包含外边距（margin）、边框（border），是一个整数，单位是像素 px。
  //offsetWidth 属性是一个只读属性，它返回该元素的像素宽度，宽度包含内边距（padding）和边框（border），不包含外边距（margin），是一个整数，单位是像素 px。
  useEffect(() => {
    setWidth(dragSlider.current.scrollWidth - dragSlider.current.offsetWidth);
  }); //scrollWidth滚动宽度,offsetWidth可见宽度;二者之差为实际宽度

  //direction意味着我们可以随心所欲地调用它
  //通过dragSlider获得滑块目前的实际位置
  //scrollAmount是滑块的滚动量,通过窗口的内部宽度得到这个变量(这也是为了照顾不同的屏幕分辨率)
  const handleScroll = (direction) => {
    const { current } = dragSlider;
    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;
    //左减右加
    //这里的left相当于是滑块最左侧的那条边框
    if (direction == "left") {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className={Style.slider}>
      <div className={Style.slider_box}>
        <h2>探索数字电影</h2>
        <div className={Style.slider_box_button}>
          <p></p>
          <div className={Style.slider_box_button_btn}>
            <div
              className={Style.slider_box_button_btn_icon}
              onClick={() => handleScroll("left")}
            >
              <TiArrowLeftThick />
            </div>
            <div
              className={Style.slider_box_button_btn_icon}
              onClick={() => handleScroll("right")}
            >
              <TiArrowRightThick />
            </div>
          </div>
        </div>
        {/* dragSlider将提供滑块目前的实际位置 */}
        {/* drag=x意味着在x轴上拖动 */}
        {/* dragConstraints是约束,滑动到这两个地方即为停止 */}
        <motion.div className={Style.slider_box_itmes} ref={dragSlider}>
          <motion.div
            ref={dragSlider}
            className={Style.slider_box_item}
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
          >
            {FollowingArray.map((el, i) => (
              <SliderCard key={i + 1} el={el} i={i} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slider;
