import { Link, NavLink } from "react-router-dom";
import logo from "@/assets/logo.svg";
import logoSm from "@/assets/logo-sm.svg";
import search from "@/assets/search.svg";
import place from "@/assets/place.svg";
import MenuLogin from "./MenuLogin";

const style = {
  container:
    "container mx-auto flex flex-col items-center justify-between py-2 md:flex-row",
  logoContainer:
    "flex w-full items-center justify-between px-5 pb-2 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.1)] backdrop-blur-[5px] md:w-auto md:px-0 md:pb-0 md:shadow-none md:backdrop-blur-none",
  menu: "hidden cursor-pointer md:block lg:hidden",
  formContainer:
    "flex w-full items-center gap-2 px-5 py-3 md:w-auto md:px-0 md:py-0",
  form: "flex h-10 lg:h-12 w-full items-center justify-between rounded-3xl border border-[#D9D9D9] py-1 pl-6 pr-1 focus-within:border focus-within:border-main-500 focus-visible:outline-none xl:w-[636px]",
  input:
    "w-full text-black placeholder:text-[#B7B7B7] focus-visible:outline-none",
  searchIcons: "rounded-full bg-main-600 p-2",
  placeBtn: "btn flex h-10 items-center text-nowrap px-3 lg:gap-1 lg:px-4",
  nav: "hidden items-center justify-between gap-6 lg:flex text-nowrap",
  mapAfter:
    "after:content text-main-500 after:absolute after:mt-1 after:w-[64px] after:border-b-2 after:border-main-500",
};

function MapNav({handleLocateUser}) {
  return (
    <div className="bg-[rgba(255,255,255,0.75)]">
      <div className={style.container}>
        <div className={style.logoContainer}>
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
          <div className="md:hidden">
            <MenuLogin />
          </div>
        </div>
        <div className={style.formContainer}>
          <form className={style.form} onSubmit={(e) => e.preventDefault()}>
            <input className={style.input} placeholder="輸入地標 或 街道名稱" />
            <button>
              <img src={search} alt="搜尋" className={style.searchIcons} />
            </button>
          </form>
          <button className={style.placeBtn}>
            <img src={place} alt="place" className="max-w-max" />
            <p className="fs-7 lg:fs-6" onClick={handleLocateUser}>定位</p>
          </button>
        </div>
        <div className={style.menu}>
          <MenuLogin />
        </div>
        <nav className={style.nav}>
          <NavLink
            to="/map"
            className={({ isActive }) => (isActive ? style.mapAfter : "")}
          >
            <h6 className="hover:text-main-500">紙箱地圖</h6>
          </NavLink>
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              isActive ? "btn fs-6 bg-main-500 shadow-none" : "btn"
            }
          >
            登入
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

export default MapNav;
