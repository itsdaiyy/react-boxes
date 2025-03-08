import { Link } from "react-router-dom";

import logo from "@/assets/logo.svg";
import logoSm from "@/assets/logo-sm.svg";
import NavMenu from "./NavMenu";

const style = {
  container:
    "container mx-auto flex items-center justify-between px-5 py-2 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.1)] backdrop-blur-[5px] lg:shadow-none lg:backdrop-blur-none",
};

function Header() {
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
        <NavMenu />
      </div>
    </header>
  );
}

export default Header;
