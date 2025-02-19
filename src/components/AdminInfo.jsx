import { useStation } from "@/hooks/useStation";
import AdminInfoForm from "./form/AdminInfoForm";
import Spinner from "./Spinner";

function AdminInfo() {
  const { station, isLoadingStation } = useStation(1);
  if (isLoadingStation) return <Spinner />;
  return (
    <>
      <div className="my-20 bg-main-100 px-3 py-10 sm:rounded-3xl sm:px-10">
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl bg-white p-4 md:w-1/2 lg:p-10">
            <AdminInfoForm station={station} />
          </div>
          <div className="flex flex-col gap-6"></div>
        </div>
      </div>
    </>
  );
}
export default AdminInfo;
