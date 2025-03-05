import { NavLink } from "react-router-dom";

const style = {
  secondNavContainer: "container mx-auto flex gap-2 overflow-x-auto",
  secondNav: "grow py-[23px] text-center text-[#6F6F6F] text-nowrap",
  secondActive:
    "grow border-b-4 border-main-600 py-[23px] text-center text-main-600 text-nowrap",
};
const normalLinks = [
  { path: "normal/memberInfo", label: "會員頁面" },
  { path: "normal/pointsRecords", label: "積分紀錄" },
  { path: "normal/transactionRecords", label: "交易紀錄" },
];

const adminLinks = [
  { path: "admin/adminInfo", label: "站點概況" },
  { path: "admin/boxesTable", label: "可認領紙箱列表" },
  { path: "admin/recyclingTable", label: "待回收紙箱列表" },
  { path: "admin/adminTransactionRecords", label: "交易紀錄" },
];
function DashboardSubNav({ role }) {
  const linksArray = role === "storeOwner" ? adminLinks : normalLinks;

  return (
    <nav className="bg-white">
      <div className={style.secondNavContainer}>
        {linksArray.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              isActive ? style.secondActive : style.secondNav
            }
          >
            <h4>{label}</h4>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default DashboardSubNav;
