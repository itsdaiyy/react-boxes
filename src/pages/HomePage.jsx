import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeSection1 from "@/components/homePage/HomeSection1";
import HomeSection2 from "@/components/homePage/HomeSection2";
import HomeSection3 from "@/components/homePage/HomeSection3";
import HomeSection4 from "@/components/homePage/HomeSection4";
import HomeSection5 from "@/components/homePage/HomeSection5";

function HomePage() {
  return (
    <div>
      <Header />
      {/* 區塊一 */}
      <HomeSection1></HomeSection1>
      {/* 區塊二 */}
      <HomeSection2></HomeSection2>
      {/* 區塊三 */}
      <HomeSection3></HomeSection3>
      {/* 區塊四 */}
      <HomeSection4></HomeSection4>
      {/* 區塊五 */}
      <HomeSection5></HomeSection5>

      <Footer />
    </div>
  );
}

export default HomePage;
