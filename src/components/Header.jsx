import { useQueryClient } from "@tanstack/react-query";
import { Link, NavLink } from "react-router-dom";
import logo from "@/assets/logo.svg";
import logoSm from "@/assets/logo-sm.svg";
import MenuLogin from "./MenuLogin";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const style = {
  container:
    "container mx-auto flex items-center justify-between px-5 py-2 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.1)] backdrop-blur-[5px] lg:shadow-none lg:backdrop-blur-none",
  menu: "hidden cursor-pointer md:block lg:hidden",
  nav: "hidden items-center justify-between gap-6 lg:flex text-nowrap",
  mapAfter:
    "after:content text-main-500 after:absolute after:mt-1 after:w-[64px] after:border-b-2 after:border-main-500",
};

function Header() {
  const queryClient = useQueryClient();
  const currentMember = queryClient.getQueryData(["member"])?.user;
  console.log("header", currentMember);
  return (
    <header className="bg-[rgba(255,255,255,0.75)]">
      <div className={style.container}>
        <Link to="/">
          <picture>
            <source
              srcSet={logoSm}
              alt="紙箱轉運站"
              media="(max-width: 992px)"
              height="40"
              width="168"
            />
            <img src={logo} alt="紙箱轉運站" height="56" width="235" />
          </picture>
        </Link>
        <div className="lg:hidden">
          <MenuLogin />
        </div>
        <nav className={style.nav}>
          <NavLink
            to="/map"
            className={({ isActive }) => (isActive ? style.mapAfter : "")}
          >
            <h6 className="hover:text-main-500">紙箱地圖</h6>
          </NavLink>
          {!currentMember && (
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                isActive ? "btn fs-6 bg-main-500 shadow-none" : "btn"
              }
            >
              登入
            </NavLink>
          )}
          {currentMember && (
            <>
              <Avatar>
                <AvatarImage
                  src={currentMember.user_metadata.avatar_url}
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
