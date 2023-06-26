import React, { useState, useMemo, useCallback, useContext } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone"; //这个钩子允许我们拖放图像

//INTERNAL IMPORT
import Style from "../styles/account.module.css";
import images from "../img";
import Form from "../AccountPage/Form/Form";

//当我们连接智能合约并创建NFT时，当我们从IPFS获取数据时，你会看到真正的魔力，
//因为当有人首先上传数据时，我们会将图像或整个数据上传到IPFS，然后从那里获取并存储到智能合约以及后端
const account = () => {
  const [fileUrl, setFileUrl] = useState(null);

  //用来拖放图像文件的函数
  const onDrop = useCallback(async (acceptedFile) => {
    setFileUrl(acceptedFile[0]);
  }, []);

  // 设定图像文件的一些属性
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  return (
    <div className={Style.account}>
      <div className={Style.account_info}>
        <h1>个人资料设置</h1>
        <p>
          您可以设置首选显示名称、创建您的个人资料URL并进行管理其他个人设置。
        </p>
      </div>

      <div className={Style.account_box}>
        <div className={Style.account_box_img} {...getRootProps()}>
          <input {...getInputProps()} />
          <Image
            src={images.user1}
            alt="account upload"
            width={150}
            height={150}
            className={Style.account_box_img_img}
          />
          <p className={Style.account_box_img_para}>修改头像</p>
        </div>
        <div className={Style.account_box_form}>
          <Form />
        </div>
      </div>
    </div>
  );
};

export default account;
