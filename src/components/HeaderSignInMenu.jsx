import { useSignOut } from "@/hooks/useSignOut";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CiLogout } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";

import HeaderAvatar from "./HeaderAvatar";

const style = {
  mapAfter:
    "after:content text-main-500 after:absolute after:left-7 after:bottom-0 after:mt-1 after:w-[64px] after:border-b-2 after:border-main-500",
};
function HeaderSignInMenu({ currentMember, setCurrentMember, role, setRole }) {
  const { signOutAsync } = useSignOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-11 w-11 rounded-full">
          <HeaderAvatar currentMember={currentMember} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="relative z-[999] mt-3 hidden w-56 text-[#6f6f6f] lg:block"
        align="end"
      >
        <DropdownMenuLabel>
          <div className="font-normal leading-[24px]">
            <p className="text-[#6f6f6f]">
              {currentMember?.user_metadata?.display_name}, 歡迎回箱
            </p>
            <p>{currentMember?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="h-0 border" />
        <DropdownMenuGroup className="pt-3">
          <DropdownMenuItem className="my-0 mb-3 p-0">
            <NavLink
              to="/member"
              className={({ isActive }) =>
                `${isActive ? style.mapAfter : "text-[#6F6F6F]"} flex w-full items-center gap-2 px-2 py-3 hover:text-main-500`
              }
            >
              <FaUser />
              {role === "storeOwner" ? "會員資訊 & 站點管理" : "會員資訊"}
            </NavLink>
          </DropdownMenuItem>

          <DropdownMenuItem className="my-0 mb-3 p-0">
            <Button
              variant="ghost"
              className="w-full justify-start px-2 py-5 hover:text-main-500"
              onClick={async () => {
                await signOutAsync();
                setCurrentMember(null);
                setRole("");
              }}
            >
              <CiLogout />
              登出
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default HeaderSignInMenu;
