import { NavLink, Outlet, useLocation } from "react-router-dom";

const style = {
  mainNavContainer:
    "container mx-auto flex w-full justify-center gap-2 md:justify-start",
  mainNav:
    "inline-flex h-[77px] grow md:grow-0 w-[168px] items-center justify-center rounded-2xl rounded-b-none border border-b-0 border-[#D9D9D9] bg-white text-[#6F6F6F]",
  mainNavActive:
    "inline-flex h-[77px] grow md:grow-0 w-[168px] items-center justify-center rounded-2xl rounded-b-none border border-b-0 border-[#D9D9D9] bg-main-600 text-white",
  secondNavContainer: "container mx-auto flex gap-2 overflow-x-auto",
  secondNav: "grow py-[23px] text-center text-[#6F6F6F] text-nowrap",
  secondActive:
    "grow border-b-4 border-main-600 py-[23px] text-center text-main-600 text-nowrap",
};

function MemberNav() {
  const location = useLocation();

  const getNavType = () => {
    if (location.pathname.startsWith("/member/normal")) {
      return "normal";
    } else if (location.pathname.startsWith("/member/admin")) {
      return "admin";
    } else {
      return "normal"; // 預設值
    }
  };

  const navType = getNavType();

  return (
    <>
      <div className="bg-[#F3F3F3]">
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
          <NavLink
            to="/member/admin"
            className={({ isActive }) =>
              isActive ? style.mainNavActive : style.mainNav
            }
          >
            <h4>管理者頁面</h4>
          </NavLink>
        </div>
      </div>
      {navType === "normal" ? <NormalNav /> : <AdminNav />}
      <div className="container mx-auto">
        <Outlet />
      </div>
    </>
  );
}

function NormalNav() {
  return (
    <div className="bg-white">
      <div className={style.secondNavContainer}>
        <NavLink
          to="normal/memberInfo"
          className={({ isActive }) =>
            isActive ? style.secondActive : style.secondNav
          }
        >
          <h4>會員頁面</h4>
        </NavLink>
        <NavLink
          to="normal/pointsRecords"
          className={({ isActive }) =>
            isActive ? style.secondActive : style.secondNav
          }
        >
          <h4>積分紀錄</h4>
        </NavLink>
        <NavLink
          to="normal/transactionRecords"
          className={({ isActive }) =>
            isActive ? style.secondActive : style.secondNav
          }
        >
          <h4>交易紀錄</h4>
        </NavLink>
      </div>
    </div>
  );
}

function AdminNav() {
  return (
    <div className="bg-white">
      <div className={style.secondNavContainer}>
        <NavLink
          to="admin/adminInfo"
          className={({ isActive }) =>
            isActive ? style.secondActive : style.secondNav
          }
        >
          <h4>站點概況</h4>
        </NavLink>
        <NavLink
          to="admin/boxesTable"
          className={({ isActive }) =>
            isActive ? style.secondActive : style.secondNav
          }
        >
          <h4>可認領紙箱列表</h4>
        </NavLink>
        <NavLink
          to="admin/recyclingTable"
          className={({ isActive }) =>
            isActive ? style.secondActive : style.secondNav
          }
        >
          <h4>待回收紙箱列表</h4>
        </NavLink>
        <NavLink
          to="admin/adminTransactionRecords"
          className={({ isActive }) =>
            isActive ? style.secondActive : style.secondNav
          }
        >
          <h4>交易紀錄</h4>
        </NavLink>
      </div>
    </div>
  );
}
export default MemberNav;
