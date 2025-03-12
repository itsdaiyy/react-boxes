import { NavLink } from "react-router-dom";

import homeSection5_lg from "@/assets/homeSection5_lg2.png";
import homeSection5_md from "@/assets/homeSection5_md.png";
import homeSection5_sm from "@/assets/homeSection5_sm.png";


export default function HomeSection5() {

    const images = [
        { src: homeSection5_lg, media: "(min-width:992px)" },
        { src: homeSection5_md, media: "(min-width:768px)" }
    ]

    return (
        <div className="relative">

            <picture className="relative">
                {images.map((item, index) => (<source key={index} srcSet={item.src} media={item.media}></source>)
                )}
                <img src={homeSection5_sm} alt="如何使用地圖來尋找可回收紙箱" className="w-full"></img>
            </picture>

            <NavLink to="/map" className='btn absolute md:left-1/2 md:-translate-x-1/2 z-10 xl:bottom-[20px] lg:bottom-[10px] md:bottom-[15px] bottom-[30px] left-[60%]'>
                前往尋找理想紙箱
            </NavLink>
            
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white/20 to-transparent xl:h-[70px] h-[60px]"></div>
        </div>
    )
}