import { NavLink } from "react-router-dom";

const style = {
  mainNavContainer:
    "container mx-auto flex w-full justify-center gap-2 md:justify-start",
  mainNav:
    "inline-flex h-[77px] grow md:grow-0 w-[168px] items-center justify-center rounded-2xl rounded-b-none border border-b-0 border-[#D9D9D9] bg-white text-[#6F6F6F]",
  mainNavActive:
    "inline-flex h-[77px] grow md:grow-0 w-[168px] items-center justify-center rounded-2xl rounded-b-none border border-b-0 border-[#D9D9D9] bg-main-600 text-white",
};

function DashboardNav({ role }) {
  return (
    <nav className="bg-[#F3F3F3]">
      {/* TabTrigger */}
      <div className={style.mainNavContainer}>
        <NavLink
          to="/member/normal"
          className={({ isActive }) =>
            isActive ? style.mainNavActive : style.mainNav
          }
        >
          <h4>會員頁面</h4>
        </NavLink>
        {role === "storeOwner" && (
          <NavLink
            to="/member/admin"
            className={({ isActive }) =>
              isActive ? style.mainNavActive : style.mainNav
            }
          >
            <h4>管理者頁面</h4>
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default DashboardNav;
