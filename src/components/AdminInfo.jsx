import { Button } from "./ui/button";

import { useStation } from "@/hooks/useStation";
import { useUpdateStationInfo } from "@/hooks/useUpdateStationInfo";
import { useUpdateAvailableSlots } from "@/hooks/useUpdateAvailableSlots";
import { getTimestamp } from "@/utils/helpers";

import Spinner from "./Spinner";

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
    <div>
      5-2 回收站點回收資訊總覽
      <div className="my-6">
        <Button
          onClick={() =>
            updateStation({
              id: 1,
              address: "新北市三重區大同南路152號1樓",
              phone: "+886-2-2975970",
              updated_at: getTimestamp(),
              station_daily_hours: [
                {
                  id: 7,
                  open_time: `05:00:00+00`,
                  close_time: `21:00:00+00`,
                  updated_at: getTimestamp(),
                },
              ],
            })
          }
          disabled={isUpdating}
        >
          更新站點基本資訊
        </Button>
        <Button
          className="ms-4"
          onClick={() => {
            updateAvailableSlots({
              stationId: station.id,
              xlCounts: 0,
              lCounts: 0,
              mCounts: 0,
              sCounts: 10,
            });
          }}
        >
          更新站點可回收紙箱數量
        </Button>
      </div>
      <div>
        <p>店名：{station_name}</p>
        <p>地址：{address}</p>
        <p>電話：{phone}</p>
        <div>
          營業時間：
          <ul className="ms-5 list-disc ps-5">
            {station_daily_hours.map((el) => (
              <li key={el.id}>
                id：{el.id} / 星期：
                {el.day_of_week === 0 ? 7 : el.day_of_week}：{el.open_time}
              </li>
            ))}
          </ul>
        </div>
        <p>可認領紙箱數量 XL：{pending_boxes_xl}</p>
        <p>可認領紙箱數量 L：{pending_boxes_l}</p>
        <p>可認領紙箱數量 M：{pending_boxes_m}</p>
        <p>可認領紙箱數量 S：{pending_boxes_s}</p>
        <p>可回收紙箱空位數 XL：{available_slots.XL}</p>
        <p>可回收紙箱空位數 L：{available_slots.L}</p>
        <p>可回收紙箱空位數 M：{available_slots.M}</p>
        <p>可回收紙箱空位數 S：{available_slots.S}</p>
      </div>
    </div>
  );
}
``;

export default AdminInfo;
