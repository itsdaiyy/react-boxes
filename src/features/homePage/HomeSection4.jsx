import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { useMember } from "@/hooks/authentication/useMember";

import homeSection4_1 from "@/assets/homeSection4_1.svg";
import homeSection4_2 from "@/assets/homeSection4_2.svg";
import homeSection4_3 from "@/assets/homeSection4_3.svg";
import homeSection4_m1 from "@/assets/homeSection4_m1.svg";
import homeSection4_m2 from "@/assets/homeSection4_m2.svg";
import homeSection4_m3 from "@/assets/homeSection4_m3.svg";

function Section4_Card({ imgUrl, title, content }) {
  return (
    <div className="w-full bg-[url(@/assets/homeSection4_boxBg.svg)] bg-contain bg-center bg-no-repeat py-[64px]">
      <div className="z-10 flex flex-col items-center justify-center">
        <picture className="relative">
          <source srcSet={imgUrl[0]} media="(min-width:992px)"></source>
          <img src={imgUrl[1]} alt={title} className="w-full"></img>
        </picture>
        <h3 className="z-10 my-[16px] text-[24px] leading-[28.8px] xl:text-[28px] xl:leading-[33.6px]">
          {title}
        </h3>
        <p className="fs-6 z-10 text-center">
          {content[0]}
          <br></br>
          {content[1]}
        </p>
      </div>

      {/* <div className="absolute bg-[url(@/assets/homeSection4_boxBg.png)] bg-center bg-contain bg-no-repeat top-1/2 left-1/2 z-0  w-full h-full lg:w-[150%] lg:h-[150%] -translate-x-1/2 -translate-y-1/2"></div> */}
    </div>
  );
}

Section4_Card.propTypes = {
  imgUrl: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.array,
};

export default function HomeSection4() {
  const { member } = useMember();
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    if (member) {
      const role = member.user.user_metadata.roles.includes("storeOwner")
        ? "storeOwner"
        : "normal";
      setRole(role);
    }
  }, [member]);

  const section4Data = [
    {
      imgUrl: [homeSection4_1, homeSection4_m1],
      title: "保留自用",
      content: ["紙箱狀態尚可且符合您的需求", "可以選擇自行保留"],
    },
    {
      imgUrl: [homeSection4_2, homeSection4_m2],
      title: "釋出認領",
      content: ["紙箱狀態尚可但無使用需求", "可以選擇釋出供民眾認領"],
    },
    {
      imgUrl: [homeSection4_3, homeSection4_m3],
      title: "進行回收",
      content: ["紙箱狀態已無法供再次使用", "將紙箱交由本平台進行回收"],
    },
  ];

  const handleClick = () => {
    if (member) {
      role === "storeOwner"
        ? navigate("member/admin/adminInfo")
        : navigate("stationSignup");
    } else {
      navigate("signin");
    }
  };

  return (
    <div className="bg-[url(@/assets/homeSection4_background_m.svg)] bg-cover bg-center bg-no-repeat py-[40px] lg:py-[160px] xl:bg-[url(@/assets/homeSection4_background.svg)]">
      <div className="container mx-auto px-5 text-center">
        <div className="mb-[40px] text-center xl:mb-[92px] xl:text-start">
          <h2 className="pb-[24px] text-[28px] leading-[33.6px] xl:text-[40px] xl:leading-[48px]">
            返箱轉運站大募集!!
          </h2>
          <p className="text-[16px] font-medium leading-[19.2px] text-[#6F6F6F] xl:text-[28px] xl:font-bold xl:leading-[33.6px]">
            收到紙箱後，您可以決定紙箱的去向<br></br>成為為紙箱的領路人
          </p>
        </div>

        <div className="mx-auto mb-[40px] flex flex-col items-center justify-center gap-[24px] xl:mb-[80px] xl:flex-row xl:gap-[40px]">
          {section4Data.map((item, index) => (
            <Section4_Card
              key={index}
              imgUrl={item.imgUrl}
              title={item.title}
              content={item.content}
            ></Section4_Card>
          ))}
        </div>

        <button onClick={handleClick} className="btn z-10">
          申請成為返箱轉運站
        </button>
      </div>
    </div>
  );
}
