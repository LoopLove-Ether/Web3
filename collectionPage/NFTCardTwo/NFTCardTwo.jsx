import React, { useState } from "react";
import Image from "next/image";
import { BsImage } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./NFTCardTwo.module.css";
import { LikeProfile } from "../../components/componentsindex";

const NFTCardTwo = ({ NFTData }) => {
  const [like, setLike] = useState(false);
  // 当有人点击like时增加like的数量
  const [likeInc, setLikeInc] = useState(21);

  const likeNFT = () => {
    if (!like) {
      setLike(true);
      setLikeInc(22);
    } else {
      setLike(false);
      setLikeInc(22 - 1);
    }
  };
  return (
    <div className={Style.NFTCardTwo}>
      {NFTData.map((el, i) => (
        <Link href={{ pathname: "/NFT-details", query: el }} key={i + 1}>
          <div className={Style.NFTCardTwo_box} key={i + 1}>
            <div className={Style.NFTCardTwo_box_like}>
              <div className={Style.NFTCardTwo_box_like_box}>
                <div className={Style.NFTCardTwo_box_like_box_box}>
                  <BsImage className={Style.NFTCardTwo_box_like_box_box_icon} />
                  <p onClick={() => likeNFT()}>
                    {/* {""}是分配的初始值 */}
                    {like ? <AiFillHeart /> : <AiOutlineHeart />}
                    {""}
                    <span>{likeInc}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className={Style.NFTCardTwo_box_img}>
              <Image
                src={el.image}
                alt="NFT"
                width={264}
                height={264}
                // object-fit:cover;
                className={Style.NFTCardTwo_box_img_img}
              />
            </div>

            <div className={Style.NFTCardTwo_box_info}>
              <div className={Style.NFTCardTwo_box_info_left}>
                <LikeProfile />
                <p>{el.name}</p>
              </div>
              <small>4{i + 2}</small>
            </div>

            <div className={Style.NFTCardTwo_box_price}>
              <div className={Style.NFTCardTwo_box_price_box}>
                <small>Current Bid</small>
                <p>{el.price || i + 4} ETH</p>
              </div>
              <p className={Style.NFTCardTwo_box_price_stock}>
                <MdTimer />
                <span>{i + 1} hours left</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NFTCardTwo;
