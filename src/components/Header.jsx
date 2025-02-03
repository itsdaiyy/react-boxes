import { Link, NavLink } from "react-router-dom";
import logo from "@/assets/logo.svg";
import logoSm from "@/assets/logo-sm.svg";
import menu from "@/assets/menu.svg";

//
const style = {
  container: "mx-auto flex items-center justify-between px-5 py-2 xl:container",
  menu: "cursor-pointer md:hidden",
  nav: "hidden items-center justify-between gap-6 md:flex",
  navAfter:
    "after:content text-main-500 after:absolute after:mt-1 after:w-[64px] after:border-b-2 after:border-main-500",
  btn: "text-main-200 bg-main-600",
};

function Header() {
  return (
    <div className="bg-[rgba(255,255,255,0.75)]">
      <div className={style.container}>
        <Link to="/">
          <picture>
            <source
              srcSet={logoSm}
              media="(max-width: 768px)"
              height="40"
              width="168"
            />
            <img src={logo} alt="紙箱轉運站" height="56" width="235" />
          </picture>
        </Link>
        <div className={style.menu}>
          <img src={menu} alt="menu" />
        </div>
        <nav className={style.nav}>
          <NavLink
            to="/map"
            className={({ isActive }) => (isActive ? style.navAfter : "")}
          >
            <h6 className="hover:text-main-500">紙箱地圖</h6>
          </NavLink>
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              isActive ? "btn bg-main-500 shadow-none" : "btn"
            }
          >
            登入
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

export default Header;
