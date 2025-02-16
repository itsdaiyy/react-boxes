import { Button } from "./ui/button";
import { useUpdateStationInfo } from "@/hooks/useUpdateStationInfo";
import { useStation } from "@/hooks/useStation";
import { getTimestamp } from "@/utils/helpers";

function AdminInfo() {
  const { station, isLoadingStation, stationError } = useStation(1);
  const { updateStation, isUpdating } = useUpdateStationInfo();

  return (
    <div>
      5-2 回收站點回收資訊總覽
      <Button
        onClick={() =>
          updateStation({
            id: 1,
            address: "新北市三重區大同南路152號1樓",
            phone: "+886-2-2975970",
            updated_at: getTimestamp(),
            station_daily_hours: [
              {
                id: 3,
                open_time: `07:00:00+00`,
                close_time: `21:00:00+00`,
                updated_at: getTimestamp(),
              },
            ],
          })
        }
        disabled={isUpdating}
      >
        Update station
      </Button>
      {station && <p>{station?.station_name}</p>}
    </div>
  );
}
``;

export default AdminInfo;
