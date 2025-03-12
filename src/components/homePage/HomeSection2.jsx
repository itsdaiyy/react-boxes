import homeSection2_1 from "@/assets/homeSection2-1.png";
import homeSection2_2 from "@/assets/homeSection2-2.png";
import homeSection2_3 from "@/assets/homeSection2-3.png";
import homeSection2_3_md from "@/assets/homeSection2-3_md.png";


function Section2_Card({ imgUrl, title, content, padding }) {
    return (
      <div className={`flex flex-col items-center lg:w-21 w-93 ${padding} relative`}>
        <img src={imgUrl} alt={title} className="mb-[24px] z-10" />
        <h3 className="mb-[16px] z-10">{title}</h3>
        <p className="z-10">{content[0]}<br></br>{content[1]}</p>
      </div>
    )
  }

export default function HomeSection2 (){

      const section2Data = [
        {
          imgUrl: homeSection2_1,
          title: '作為網購消費者',
          content: ['太多網購紙箱囤積在家中', '丟棄浪費卻又沒有空間收藏']
        },
        {
          imgUrl: homeSection2_2,
          title: '做為小型店家',
          content: ['每次出貨都需要採購', '許多一次性紙箱']
        }
      ]
    

    return (
        <div className="relative">
                <div className="text-center lg:py-[80px] py-[40px] relative z-10">
                  <h2 className="lg:text-[40px] text-[28px] lg:leading-[48px] leading-[33.6px] mb-[40px]">你也有這種困擾嗎？</h2>
                  <div className="flex lg:flex-row flex-col justify-center items-center">
                    <div className="w-full relative 
                before:absolute before:w-full before:h-full before:bg-main-100 before:left-0 before:top-0 before:content-[''] lg:before:hidden">
                      <Section2_Card imgUrl={section2Data[0].imgUrl} title={section2Data[0].title} content={section2Data[0].content} padding={`pb-[40px] lg:pb-0`} bgColor={`main-100`}></Section2_Card>
                    </div>
                    <div className="w-full relative 
                before:absolute before:w-full before:h-full before:bg-second-100 before:left-0 before:top-0 before:content-[''] lg:before:hidden">
                      <Section2_Card imgUrl={section2Data[1].imgUrl} title={section2Data[1].title} content={section2Data[1].content} padding={`pt-[40px] lg:pt-0`} bgColor={`second-100`}></Section2_Card>
                    </div>
                  </div>
                </div>
                <img src={homeSection2_3} alt="有沒有更環保的選擇呢" className="relative z-10 w-full object-cover h-auto hidden xl:block" />
                <img src={homeSection2_3_md} alt="有沒有更環保的選擇呢" className="relative z-10 w-full object-cover h-auto block hidden lg:block xl:hidden" />
                <img src={homeSection2_3_md} alt="有沒有更環保的選擇呢" className="relative z-10 w-full object-cover h-auto block lg:hidden" />
                <div className="z-0 absolute inset-0 
                before:absolute lg:before:w-1/2 before:w-full lg:before:h-full before:h-2/6 before:bg-main-100 top-0 before:content-[''] 
                after:absolute lg:after:w-1/2 after:w-full lg:after:h-full after:h-4/6 lg:after:right-0 after:bottom-0 after:bg-second-100 after:content-['']">
                </div>
        
              </div>
    )
}