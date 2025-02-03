import { Link } from "react-router-dom";

import logoWhite from "@/assets/logo-white.svg";
import fb from "@/assets/fb.svg";
import yt from "@/assets/yt.svg";
import ig from "@/assets/ig.svg";

const style = {
  container: "",
  nav: "mb-4 ml-auto flex w-[152px] items-center justify-between gap-4",
};

function Footer() {
  return (
    <>
      <div className="bg-main-600">
        <div className="mx-auto flex flex-col items-center justify-between px-5 py-10 xl:container md:flex-row">
          <Link to="/" className="mb-4 md:mb-0">
            <img src={logoWhite} alt="紙箱轉運站" height="56" width="235" />
          </Link>
          <div>
            <nav className={style.nav}>
              <img src={fb} alt="facebook" className="cursor-pointer" />
              <img src={yt} alt="youtube" className="cursor-pointer" />
              <img src={ig} alt="instagram" className="cursor-pointer" />
            </nav>
            <h6 className="text-white">返箱環保工程股份有限公司</h6>
          </div>
        </div>
      </div>
      <div className="bg-main-400">
        <p className="fs-7 py-4 text-center text-main-600">
          本網站僅供個人作品使用，不提供商業用途
        </p>
      </div>
    </>
  );
}

export default Footer;
