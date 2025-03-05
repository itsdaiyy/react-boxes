import memberBannerBg01 from "@/assets/memberBanner-bg1.svg";

function Banner({ children, member }) {
  return (
    <div>
      <section className="bg-[#F3F3F3] bg-top bg-no-repeat md:bg-[url('@/assets/memberBanner-bg2.svg')]">
        <div className="container relative mx-auto flex flex-col items-center gap-10 py-20 text-center md:flex-row md:justify-between md:text-left">
          <div className="relative h-[201px] w-[200px]">
            <img
              src={member.user.user_metadata.avatar_url}
              alt="會員頭像"
              className="absolute z-10 rounded-full"
            />
            <img
              src={memberBannerBg01}
              alt="背景圖"
              className="absolute -bottom-3 -left-14 hidden md:flex"
            />
          </div>
          {children}
        </div>
      </section>
    </div>
  );
}

export default Banner;
