import { NavLink } from "react-router-dom"

export default function HomeSection1 (){

    // style
      const bannerText = {
        textShadow: '0px 4px 4px rgba(0, 0, 0, 0.3), 0px 8px 12px rgba(0, 0, 0, 0.1)'
      }
    

    return (
              <div className="bg-[url(@/assets/homeBanner_2_reduce.jpg)] bg-center bg-cover bg-no-repeat relative before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-60 h-screen">
                <div className="container mx-auto lg:pt-[25vh] pt-[30vh] flex flex-col items-center justify-center">
                  <div className="text-center flex flex-col lg:mb-[40px] mb-[16px] lg:gap-[40px] gap-[16px] relative z-10">
                    <h2 className="font-black lg:leading-[76.8px] lg:text-[64px] leading-[33.6px] text-[28px] text-white " style={bannerText}>全國首創二手紙箱交換平台</h2>
                    <h2 className="font-black lg:leading-[76.8px] lg:text-[64px] leading-[33.6px] text-[28px] text-white  " style={bannerText}>讓紙箱找到返箱的路</h2>
                  </div>
        
                  <NavLink to="/signin" className="btn z-10">登入查詢鄰近站點</NavLink>
        
                </div>
              </div>
    )
}