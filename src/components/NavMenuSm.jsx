import { NavLink } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";

import { MenuIcon } from "lucide-react";
import { CiLogin, CiLogout } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { MdPlace } from "react-icons/md";

import { useSignOut } from "@/hooks/authentication/useSignOut";

import HeaderAvatar from "@/components/HeaderAvatar";

const style = {
  mapAfter:
    "after:content text-main-500 after:absolute after:left-7 after:bottom-0 after:mt-1 after:w-[64px] after:border-b-2 after:border-main-500",
};

function NavMenuSm({ currentMember, setCurrentMember, role, setRole }) {
  const { signOutAsync } = useSignOut();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="[&_svg]:size-5">
          <MenuIcon className="flex-1 shrink-0 text-[#4767A2]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="mt-2 w-56 text-[#6f6f6f] lg:hidden"
        align="end"
      >
        {currentMember && (
          <>
            <DropdownMenuLabel className="p-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="grow-0">
                  <HeaderAvatar currentMember={currentMember} />
                </div>

                <div className="font-normal leading-[24px]">
                  <p className="text-[#6f6f6f]">
                    {currentMember?.user_metadata?.display_name}, 歡迎回箱
                  </p>
                  <p>{currentMember?.email}</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="border" />
          </>
        )}

        <DropdownMenuGroup>
          <DropdownMenuItem className="my-3 p-0">
            <NavLink
              to="/map"
              className={({ isActive }) =>
                `${isActive ? style.mapAfter : "text-[#6F6F6F]"} flex w-full items-center gap-2 px-2 py-3 hover:text-main-500`
              }
            >
              <MdPlace />
              紙箱地圖
            </NavLink>
          </DropdownMenuItem>
          {currentMember && (
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
          )}
          {currentMember && (
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
          )}

          {!currentMember && (
            <DropdownMenuItem className="my-0 mb-3 p-0">
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  `${isActive ? style.mapAfter : "text-[#6F6F6F]"} flex w-full items-center gap-2 px-2 py-3 hover:text-main-500`
                }
              >
                <CiLogin />
                登入
              </NavLink>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NavMenuSm;
