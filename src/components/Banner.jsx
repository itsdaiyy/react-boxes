import memberBannerBg01 from "@/assets/memberBanner-bg1.svg";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function Banner({ children, member }) {
  return (
    <div>
      <section className="bg-[#F3F3F3] bg-top bg-no-repeat md:bg-[url('@/assets/memberBanner-bg2.svg')]">
        <div className="container relative mx-auto flex flex-col items-center gap-10 py-20 text-center md:flex-row md:justify-between md:text-left">
          <div className="relative h-[200px] w-[200px] shrink-0">
            <Avatar className="relative z-10 h-full w-full">
              <AvatarImage
                src={member.user.user_metadata.avatar_url}
                alt={member.user.user_metadata.display_name}
                className="object-cover"
              />
              <AvatarFallback delayMs={600}>
                {member.user.user_metadata.display_name}
              </AvatarFallback>
            </Avatar>
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
