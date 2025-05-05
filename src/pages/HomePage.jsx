import { useRef } from "react";
import { useMember } from "@/hooks/authentication/useMember";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Spinner from "@/components/Spinner";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import HomeSection1 from "@/features/homePage/HomeSection1";
import HomeSection2 from "@/features/homePage/HomeSection2";
import HomeSection3 from "@/features/homePage/HomeSection3";
import HomeSection4 from "@/features/homePage/HomeSection4";
import HomeSection5 from "@/features/homePage/HomeSection5";

function HomePage() {
  const { isLoadingMember } = useMember();
  const container = useRef();

  useGSAP(
    () => {
      if (isLoadingMember) return;
      gsap.utils.toArray(".title-animation").forEach((el) => {
        gsap.from(el, {
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
          duration: 0.8,
          opacity: 0,
          y: 20,
        });
      });

      gsap.from(".opacity-animation", {
        scrollTrigger: {
          trigger: ".opacity-animation",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        duration: 0.8,
        opacity: 0,
      });
    },
    { scope: container, dependencies: [isLoadingMember] },
  );

  return (
    <div ref={container}>
      {isLoadingMember && <Spinner />}

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
