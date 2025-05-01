import { Outlet } from "react-router-dom";

function MapPage() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr]">
      <Outlet />
    </div>
  );
}

export default MapPage;
