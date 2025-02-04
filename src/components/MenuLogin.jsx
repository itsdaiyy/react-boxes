import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import { CiLogin } from "react-icons/ci";
import { MdPlace } from "react-icons/md";
import { NavLink } from "react-router-dom";

const style = {
  mapAfter:
    "after:content text-main-500 after:absolute after:left-8 after:mt-1 after:w-[64px] after:border-b-2 after:border-main-500",
};
function Menu() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MenuIcon className="text-[#4767A2]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-4 w-[375px]">
          <DropdownMenuItem>
            <NavLink
              to="/map"
              className={({ isActive }) =>
                isActive ? style.mapAfter : "text-[#6F6F6F]"
              }
            >
              <h6 className="fs-6 flex items-center gap-2 hover:text-main-500">
                <MdPlace />
                紙箱地圖
              </h6>
            </NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <NavLink to="/signin">
              <h6 className="fs-6 flex items-center gap-2 text-[#6F6F6F] hover:text-main-500">
                <CiLogin />
                登入
              </h6>
            </NavLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default Menu;
