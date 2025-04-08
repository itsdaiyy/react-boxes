import { NavLink } from "react-router-dom"
import PropTypes from "prop-types";

import homeSection4_1 from "@/assets/homeSection4_1.png";
import homeSection4_2 from "@/assets/homeSection4_2.png";
import homeSection4_3 from "@/assets/homeSection4_3.png";

function Section4_Card({ imgUrl, title, content }) {
  return (
    <div className="bg-[url(@/assets/homeSection4_boxBg.png)] bg-center bg-contain bg-no-repeat w-full py-[64px]">
      <div className="flex flex-col items-center justify-center z-10">
        <img src={imgUrl} alt={title} className="w-34 h-auto z-10" />
        <h3 className="my-[16px] z-10 xl:text-[28px] text-[24px] xl:leading-[33.6px] leading-[28.8px]">{title}</h3>
        <p className="fs-6 text-center z-10">{content[0]}<br></br>{content[1]}</p>
      </div>

      {/* <div className="absolute bg-[url(@/assets/homeSection4_boxBg.png)] bg-center bg-contain bg-no-repeat top-1/2 left-1/2 z-0  w-full h-full lg:w-[150%] lg:h-[150%] -translate-x-1/2 -translate-y-1/2"></div> */}
    </div>

  )
}

Section4_Card.propTypes = { 
  imgUrl:PropTypes.string, 
  title:PropTypes.string, 
  content:PropTypes.array }

export default function HomeSection4 (){

    const section4Data = [
        {
          imgUrl: homeSection4_1,
          title: '保留自用',
          content: ['紙箱狀態尚可且符合您的需求', '可以選擇自行保留'],
        },
        {
          imgUrl: homeSection4_2,
          title: '釋出認領',
          content: ['紙箱狀態尚可但無使用需求', '可以選擇釋出供民眾認領'],
        },
        {
          imgUrl: homeSection4_3,
          title: '進行回收',
          content: ['紙箱狀態已無法供再次使用', '將紙箱交由本平台進行回收'],
        }
      ]

    return(
        <div className="xl:bg-[url(@/assets/homeSection4_background.png)] bg-main-100 bg-center bg-cover bg-no-repeat lg:py-[160px] py-[40px]">
        <div className="container mx-auto px-5 text-center">
            
          <div className="xl:text-start text-center xl:mb-[92px] mb-[40px]">
            <h2 className="xl:text-[40px] text-[28px] xl:leading-[48px] leading-[33.6px] pb-[24px]">紙箱轉運站大募集!!</h2>
            <p className="text-[#6F6F6F] xl:text-[28px] text-[16px] xl:leading-[33.6px] leading-[19.2px] font-medium xl:font-bold">收到紙箱後，您可以決定紙箱的去向<br></br>成為為紙箱的領路人</p>
          </div>

          <div className="flex xl:flex-row flex-col mx-auto justify-center items-center gap-[24px] xl:gap-[40px] xl:mb-[80px] mb-[40px]">
            {
              section4Data.map((item, index) => (
                <Section4_Card key={index} imgUrl={item.imgUrl} title={item.title} content={item.content}></Section4_Card>
              ))
            }

          </div>

          <NavLink to="/signin" className="btn z-10">申請成為紙箱轉運站</NavLink>

        </div>
      </div>
    )
}