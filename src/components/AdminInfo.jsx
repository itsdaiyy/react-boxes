import { Button } from "./ui/button";

import { useStation } from "@/hooks/useStation";
import { useUpdateStationInfo } from "@/hooks/useUpdateStationInfo";
import { useUpdateAvailableSlots } from "@/hooks/useUpdateAvailableSlots";
import { getTimestamp } from "@/utils/helpers";

import Spinner from "./Spinner";

import AdminInfoForm from "./form/AdminInfoForm";
import MemberInfoForm from "./form/MemberInfoForm";

const style = {
  cardContainer: "flex items-center justify-around rounded-2xl bg-white p-10",
  cardText: "text-2xl font-bold",
  cardNumber: "text-6xl font-bold text-main-600",
};

function AdminInfo() {
  const { station, isLoadingStation, stationError } = useStation(1);
  const { updateStation, isUpdating } = useUpdateStationInfo();
  const { updateAvailableSlots, isLoading } = useUpdateAvailableSlots();

  if (isLoadingStation) return <Spinner />;

  const {
    id,
    station_name,
    address,
    phone,
    image_url,
    station_daily_hours,
    pending_boxes_xl,
    pending_boxes_l,
    pending_boxes_m,
    pending_boxes_s,
    available_slots,
  } = station;

  return (
    <>
      <div className="my-20 bg-main-100 px-3 py-10 sm:rounded-3xl sm:px-10">
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl bg-white p-4 md:w-1/2 lg:p-10">
            <AdminInfoForm />
          </div>
          <div className="flex flex-col gap-6"></div>
        </div>
      </div>
    </>
  );
}
``;

export default AdminInfo;
