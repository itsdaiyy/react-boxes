import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent, } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { Button } from "./ui/button";
import { useStation } from "@/hooks/useStation";
import { useStations } from "@/hooks/useStations";

import MapNav from "./MapNav";
import Spinner from "@/components/Spinner";
import ErrorMessage from "./ErrorMessage";

// 取得使用者定位
const UserLocation = () => {
  const map = useMap();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setView([latitude, longitude], 15); // 設定地圖中心到用戶位置
        },
        (error) => {
          console.error("無法獲取位置：", error);
        }
      );
    } else {
      console.error("瀏覽器不支援地理位置功能！");
    }
  }, [map]);

  return null; // 不需要渲染任何元素
};

function Map() {
  const [clickedId, setClickedId] = useState(null);
  const { stations, isLoadingStations, stationsError } = useStations();
  const { station, isLoadingStation, stationError } = useStation(clickedId);

  if (isLoadingStations) return <Spinner />;
  if (stationsError) return <ErrorMessage error={stationsError} />;

// 計算紙箱數量
  const countRecyclableBoxes = (station) => {
    return station.recyclable_boxes.XL + station.recyclable_boxes.L + station.recyclable_boxes.M + station.recyclable_boxes.S
}

const countPendingBoxes = (station) => {
    return station.pending_boxes_xl + station.pending_boxes_l + station.pending_boxes_m + station.pending_boxes_s
}

  return (
    <>
      <MapNav />

      <MapContainer
        center={[stations[0].latitude, stations[0].longitude]} // 預設第一個站點
        zoom={15}
        style={{ height: '500px', width: "100%" }}
      >
        {/* 地圖圖層 */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* 關閉側邊欄 */}
        {/* <MapClickHandler onMapClick={() => setClickedId(null)} /> */}

        {/* 地圖上的標記 */}
        {
          stations.map(item => (
            <Marker position={[item.latitude, item.longitude]} key={item.id} eventHandlers={{
              click: () => {
                setClickedId(item.id); // 設定選中的站點
              },
            }}>
              <Popup>
                {station ?
                  (<div className="p-[24px]">
                    <h6 className='text-start mb-[12px]'>{station.station_name}</h6>
                    <div className="flex gap-[8px] justify-center">
                      <p className="bg-main-200 py-[4px] px-[12px] rounded-full fs-7">{`可回收${countRecyclableBoxes(station)}個`}</p>
                      <p className="bg-second-200 py-[4px] px-[12px] rounded-full fs-7">{`可認領${countPendingBoxes(station)}個`}</p>
                    </div>
                    <p className="mb-[12px]">{station.address}</p>
                    <Button className="btn">查看更多</Button>
                  </div>
                  ) : ''}

              </Popup>
            </Marker>
          ))
        }

        <UserLocation />
      </MapContainer>
    </>
  );
}

export default Map;
