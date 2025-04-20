import { useNavigate } from "react-router-dom";
import { useMember } from "@/hooks/authentication/useMember";

export default function HomeSection1() {
  const { member } = useMember();
  const navigate = useNavigate();

  // style
  const bannerText = {
    textShadow:
      "0px 4px 4px rgba(0, 0, 0, 0.3), 0px 8px 12px rgba(0, 0, 0, 0.1)",
  };

  const handleClick = () => {
    if (member) {
      navigate("map");
    } else {
      navigate("signin");
    }
  };

  return (
    <div className="relative mt-[56px] bg-[url(@/assets/homeBanner_2_reduce.jpg)] bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-black before:opacity-60 before:content-[''] lg:mt-[72px]">
      <div className="container mx-auto flex flex-col items-center justify-center py-[30vh]">
        <div className="relative z-10 mb-[16px] flex flex-col gap-[16px] text-center lg:mb-[40px] lg:gap-[40px]">
          <h2
            className="text-[28px] font-black leading-[33.6px] text-white lg:text-[64px] lg:leading-[76.8px]"
            style={bannerText}
          >
            全國首創二手紙箱交換平台
          </h2>
          <h2
            className="text-[28px] font-black leading-[33.6px] text-white lg:text-[64px] lg:leading-[76.8px]"
            style={bannerText}
          >
            讓紙箱找到返箱的路
          </h2>
        </div>

        <button onClick={handleClick} className="btn z-10">
          登入查詢鄰近站點
        </button>
      </div>
    </div>
  );
}
