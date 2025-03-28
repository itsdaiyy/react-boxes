import { NavLink } from "react-router-dom";
import HeaderSignInMenu from "@/components/HeaderSignInMenu";

const style = {
  nav: "hidden items-center justify-between gap-6 lg:flex text-nowrap",
  mapAfter:
    "after:content text-main-500 after:absolute after:mt-1 after:w-[64px] after:border-b-2 after:border-main-500",
};
function NavMenuLg({ currentMember, setCurrentMember, role, setRole }) {
  return (
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
        <HeaderSignInMenu
          currentMember={currentMember}
          setCurrentMember={setCurrentMember}
          role={role}
          setRole={setRole}
        />
      )}
    </nav>
  );
}

export default NavMenuLg;
