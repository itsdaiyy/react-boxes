import { useEffect, useState } from "react";
import { useMember } from "@/hooks/useMember";

import NavMenuSm from "./NavMenuSm";
import NavMenuLg from "./NavMenuLg";

function NavMenu() {
  const { member } = useMember();

  const [currentMember, setCurrentMember] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    if (member) {
      setCurrentMember(member.user);
      const role = member.user.user_metadata.roles.includes("storeOwner")
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
