import { Link } from "react-router-dom";
import { useSignOut } from "@/hooks/useSignOut";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiLogout } from "react-icons/ci";
import HeaderAvatar from "./HeaderAvatar";

function HeaderSignInMenu({ currentMember, setCurrentMember }) {
  const { signOutAsync, isLoading } = useSignOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-11 w-11 rounded-full px-0">
          <HeaderAvatar currentMember={currentMember} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-4 w-[200px] sm:mr-14 sm:pr-4">
        <DropdownMenuLabel>
          <div className="font-normal leading-[24px]">
            <p className="text-[#6f6f6f]">
              {currentMember?.user_metadata?.display_name}, 歡迎回箱
            </p>
            <p>{currentMember?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              to={{
                pathname: "/member",
              }}
            >
              會員資訊
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              variant="ghost"
              className="px-0"
              onClick={async () => {
                await signOutAsync();
                setCurrentMember(null);
              }}
              disabled={isLoading}
            >
              登出
            </Button>
            <DropdownMenuShortcut>
              <CiLogout />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default HeaderSignInMenu;
