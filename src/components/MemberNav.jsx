import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, NavLink } from "react-router-dom";

const style = {
  TabsList:
    "h-full w-full gap-2 rounded-none bg-[#F3F3F3] p-0 md:justify-start",
  TabListContainer: "container mx-auto",
  TabsTrigger:
    "h-[77px] w-[168px] rounded-2xl rounded-b-none border border-b-0 border-[#D9D9D9] bg-[#FFFFFF] p-6 text-[#6F6F6F] data-[state=active]:bg-main-600 data-[state=active]:text-white",
  TabsContentContainer: "container mx-auto flex justify-between text-[#6F6F6F]",
  NavLink: "text-center py-[23px] grow",
  active: "grow border-b-4 border-main-600 py-[23px] text-center text-main-600",
};
function MemberNav() {
  return (
    <Tabs defaultValue="member">
      <div className="bg-[#F3F3F3]">
        <div className={style.TabListContainer}>
          <TabsList className={style.TabsList}>
            <TabsTrigger value="member" className={style.TabsTrigger}>
              <Link to="/member/memberInfo">
                <h4>會員頁面</h4>
              </Link>
            </TabsTrigger>
            <TabsTrigger value="admit" className={style.TabsTrigger}>
              <Link to="/member/admitInfo">
                <h4>管理者頁面</h4>
              </Link>
            </TabsTrigger>
          </TabsList>
        </div>
      </div>
      <TabsContent value="member" className="bg-white">
        <div className={style.TabsContentContainer}>
          <NavLink
            to="memberInfo"
            className={({ isActive }) =>
              isActive ? style.active : style.NavLink
            }
          >
            <h5>會員資訊</h5>
          </NavLink>
          <NavLink
            to="pointsRecords"
            className={({ isActive }) =>
              isActive ? style.active : style.NavLink
            }
          >
            <h5>積分紀錄</h5>
          </NavLink>
          <NavLink
            to="transactionRecords"
            className={({ isActive }) =>
              isActive ? style.active : style.NavLink
            }
          >
            <h5>交易紀錄</h5>
          </NavLink>
        </div>
      </TabsContent>
      <TabsContent value="admit">
        <div className={style.TabsContentContainer}>
          <NavLink
            to="admitInfo"
            className={({ isActive }) =>
              isActive ? style.active : style.NavLink
            }
          >
            <h5>站點概述</h5>
          </NavLink>
          <NavLink
            to="boxesTable"
            className={({ isActive }) =>
              isActive ? style.active : style.NavLink
            }
          >
            <h5>可認領紙箱列表</h5>
          </NavLink>
          <NavLink
            to="recyclingTable"
            className={({ isActive }) =>
              isActive ? style.active : style.NavLink
            }
          >
            <h5>待回收紙箱列表</h5>
          </NavLink>
          <NavLink
            to="admitTransactionRecords"
            className={({ isActive }) =>
              isActive ? style.active : style.NavLink
            }
          >
            <h5>交易紀錄</h5>
          </NavLink>
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default MemberNav;
