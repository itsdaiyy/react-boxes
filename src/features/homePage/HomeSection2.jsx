import PropTypes from "prop-types";

import homeSection2_1 from "@/assets/homeSection2-1.png";
import homeSection2_2 from "@/assets/homeSection2-2.png";
import homeSection2_3 from "@/assets/homeSection2-3.png";
import homeSection2_3_md from "@/assets/homeSection2-3_md.png";

function Section2_Card({ imgUrl, title, content, padding }) {
  return (
    <div
      className={`lg:w-21 w-93 flex flex-col items-center ${padding} relative`}
    >
      <img src={imgUrl} alt={title} className="z-10 mb-[24px]" />
      <h3 className="z-10 mb-[16px]">{title}</h3>
      <p className="z-10">
        {content[0]}
        <br></br>
        {content[1]}
      </p>
    </div>
  );
}

Section2_Card.propTypes = {
  imgUrl: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.array,
  padding: PropTypes.string,
};

export default function HomeSection2() {
  const section2Data = [
    {
      imgUrl: homeSection2_1,
      title: "作為網購消費者",
      content: ["太多網購紙箱囤積在家中", "丟棄浪費卻又沒有空間收藏"],
    },
    {
      imgUrl: homeSection2_2,
      title: "做為小型店家",
      content: ["每次出貨都需要採購", "許多一次性紙箱"],
    },
  ];

  return (
    <div className="relative">
      <div className="relative z-10 py-[40px] text-center lg:py-[80px]">
        <h2 className="mb-[40px] text-[28px] leading-[33.6px] lg:text-[40px] lg:leading-[48px]">
          你也有這種困擾嗎？
        </h2>
        <div className="flex flex-col items-center justify-center lg:flex-row">
          <div className="relative w-full before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-main-100 before:content-[''] lg:before:hidden">
            <Section2_Card
              imgUrl={section2Data[0].imgUrl}
              title={section2Data[0].title}
              content={section2Data[0].content}
              padding={`pb-[40px] lg:pb-0`}
              bgColor={`main-100`}
            ></Section2_Card>
          </div>
          <div className="relative w-full before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-second-100 before:content-[''] lg:before:hidden">
            <Section2_Card
              imgUrl={section2Data[1].imgUrl}
              title={section2Data[1].title}
              content={section2Data[1].content}
              padding={`pt-[40px] lg:pt-0`}
              bgColor={`second-100`}
            ></Section2_Card>
          </div>
        </div>
      </div>
      <img
        src={homeSection2_3}
        alt="有沒有更環保的選擇呢"
        className="relative z-10 hidden h-auto w-full object-cover xl:block"
      />
      <img
        src={homeSection2_3_md}
        alt="有沒有更環保的選擇呢"
        className="relative z-10 hidden h-auto w-full object-cover lg:block xl:hidden"
      />
      <img
        src={homeSection2_3_md}
        alt="有沒有更環保的選擇呢"
        className="relative z-10 block h-auto w-full object-cover lg:hidden"
      />
      <div className="absolute inset-0 top-0 z-0 before:absolute before:h-2/6 before:w-full before:bg-main-100 before:content-[''] after:absolute after:bottom-0 after:h-4/6 after:w-full after:bg-second-100 after:content-[''] lg:before:h-full lg:before:w-1/2 lg:after:right-0 lg:after:h-full lg:after:w-1/2"></div>
    </div>
  );
}
