import Header from "@/components/Header";
import Footer from "@/components/Footer";



function HomePage() {

  const bannerText = {
    textShadow:'0px 4px 4px rgba(0, 0, 0, 0.3), 0px 8px 12px rgba(0, 0, 0, 0.1)'
  }

  return (
    <div>
      <Header />
      <div className="bg-[url(@/assets/homeBanner.png)] bg-center bg-cover bg-no-repeat relative before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-60 ">
      <div className="container mx-auto pt-[324px] pb-[396px] flex flex-col items-center justify-center">
        <div className="text-center flex flex-col mb-[40px] gap-[40px] relative z-10">
        <h2 className="font-black text-[64px] leading-[76.8px] text-white" style={bannerText}>全國首創二手紙箱交換平台</h2>
        <h2 className="font-black text-[64px] leading-[76.8px] text-white" style={bannerText}>讓紙箱找到返箱的路</h2>
        </div>

        <button>登入查詢鄰近站點</button>

      </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default HomePage;
