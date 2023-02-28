// import React from "react";
// import Image from "next/image";

// //INTERNAL IMPORT
// import Style from "./Video.module.css";
// import images from "../../img";

// const Video = () => {
//   return (
//     <div className={Style.Video}>
//       <div className={Style.Video_box}>
//         <h1>
//           <span>🎬</span> The Videos
//         </h1>
//         <p>
//           Check out our hottest videos. View more and share more new
//           perspectives on just about any topic. Everyone’s welcome.
//         </p>

//         <div className={Style.Video_box_frame}>
//           <div className={Style.Video_box_frame_left}>
//             {/* 在这里只是用Image在frame中构建布局 */}
//             {/* 这里本来应该放置VideoCard组件,但是这个组件需要花费很多的时间,需要设计播放,暂停等许多的功能,
//                 还需要从服务器上传视频,所以说当我们从API获得数据后再设计这个组件 */}
//             <Image
//               src={images.NFTVideo}
//               alt="Video image"
//               width={700}
//               height={1080}
//               // object-fit:cover
//               className={Style.Video_box_frame_left_img}
//             />
//           </div>

//           <div className={Style.Video_box_frame_right}>Hey</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Video;
