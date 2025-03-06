import { useQueryClient } from "@tanstack/react-query";
import NavMenuSm from "./NavMenuSm";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import HeaderSignInMenu from "./HeaderSignInMenu";
import NavMenuLg from "./NavMenuLg";

function NavMenu() {
  const queryClient = useQueryClient();
  const member = queryClient.getQueryData(["member"])?.user;
  const [currentMember, setCurrentMember] = useState(null);
  const [role, setRole] = useState("");
  console.log("Header", currentMember);

  useEffect(() => {
    if (member) {
      setCurrentMember(member);
      const role = member.user_metadata.roles.includes("storeOwner")
        ? "storeOwner"
        : "normal";
      setRole(role);
    }
  }, [member, setCurrentMember]);

  return (
    <>
      {/* mobile */}
      <div className="lg:hidden">
        <NavMenuSm
          currentMember={currentMember}
          setCurrentMember={setCurrentMember}
          role={role}
          setRole={setRole}
        />
      </div>
      {/* desktop */}
      <NavMenuLg
        currentMember={currentMember}
        setCurrentMember={setCurrentMember}
        role={role}
        setRole={setRole}
      />
    </>
  );
}

export default NavMenu;
