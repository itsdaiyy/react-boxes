import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent, } from "react-leaflet";
import { NavLink } from 'react-router-dom';
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { Button } from "./ui/button";
import { useStation } from "@/hooks/useStation";
import { useStations } from "@/hooks/useStations";

import MapNav from "./MapNav";
import Spinner from "@/components/Spinner";
import ErrorMessage from "./ErrorMessage";
import mapMark from "../assets/mapMark.png";

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
  const [clickedId, setClickedId] = useState(null); //送入站點id，設定選擇站點
  const { stations, isLoadingStations, stationsError } = useStations(); //全部站點
  const { station, isLoadingStation, stationError } = useStation(clickedId); //所選擇的站點詳細資訊

  const [isAllOpenTime, setIsAllOpenTime] = useState(false); //開啟詳細營業時間
  const [isBoxSize, setIsBoxSize] = useState(false);//開啟查看紙箱尺寸
  const [isSideBar, setIsSideBar] = useState(false);//開啟SideBar

  if (isLoadingStations) return <Spinner />;
  if (stationsError) return <ErrorMessage error={stationsError} />;

  // 資料處理
  // 計算紙箱數量
  const countRecyclableBoxes = (station) => {
    return station.recyclable_boxes.XL + station.recyclable_boxes.L + station.recyclable_boxes.M + station.recyclable_boxes.S
  }

  const countPendingBoxes = (station) => {
    return station.pending_boxes_xl + station.pending_boxes_l + station.pending_boxes_m + station.pending_boxes_s
  }
  // 電話國際碼轉換市碼
  const formatPhoneNumber = (phone) => {
    return phone.replace(/^\+886-/, "0").replace(/#$/, "");
  }
  // 取得一週的營業時間
  const formatOpenTime = (station_daily_hours) => {
    return station_daily_hours.map((item, index) => {
      const openTime = item.open_time.replace(/^(\d{2}:\d{2}):\d{2}.*/, "$1");
      const closeTime = item.close_time.replace(/^(\d{2}:\d{2}):\d{2}.*/, "$1");

      if (index === 0) {
        return <li key={index}>{`星期日 ${openTime}-${closeTime}`}</li>
      } else if (index === 1) {
        return <li key={index}>{`星期一 ${openTime}-${closeTime}`}</li>
      } else if (index === 2) {
        return <li key={index}>{`星期二 ${openTime}-${closeTime}`}</li>
      } else if (index === 3) {
        return <li key={index}>{`星期三 ${openTime}-${closeTime}`}</li>
      } else if (index === 4) {
        return <li key={index}>{`星期四 ${openTime}-${closeTime}`}</li>
      } else if (index === 5) {
        return <li key={index}>{`星期五 ${openTime}-${closeTime}`}</li>
      } else {
        return <li key={index}>{`星期六 ${openTime}-${closeTime}`}</li>
      }

    })
  }
  // 取得本日營業時間
  const getTodayOpenTime = (station_daily_hours) => {
    const today = new Date().getDay();
    let todayOpenTime = '';
    station_daily_hours.forEach((item, index) => {
      const openTime = item.open_time.replace(/^(\d{2}:\d{2}):\d{2}.*/, "$1");
      const closeTime = item.close_time.replace(/^(\d{2}:\d{2}):\d{2}.*/, "$1");

      if (today === index) {
        todayOpenTime = `${openTime}-${closeTime}`
      }
    })

    return todayOpenTime;

  }
  // 設定icon
  const customIcon = new L.Icon({
    iconUrl: mapMark,
    iconSize: [40, 40],
  });

  return (
    <>
      <MapNav />

      <div className="mx-auto flex flex-col md:flex-row justify-between relative" style={{ height: '700px', width: "100%" }}>
        {/* 側邊欄 */}
        {isSideBar ? <div className="w-[486px] overflow-auto flex-shrink-0">
          {station ? (
            <div>
              <img src={station.image_url} alt={station.station_name} className="object-cover w-full" />
              <div className="p-[24px]" >
                <h5 className="mb-[12px]">{station.station_name}</h5>
                <h5 className="text-base flex gap-[8px] mb-[12px]">
                  {countRecyclableBoxes(station) ? <span className="rounded-full bg-main-200 py-[4px] px-[12px] fs-7">可認領</span> : <></>}
                  {countPendingBoxes(station) ? <span className="rounded-full bg-second-200 py-[4px] px-[12px] fs-7">可認領</span> : <></>}
                </h5>

                <ul className="fs-6 text-[#6F6F6F] flex flex-col gap-[12px] mb-[12px]">
                  <li className="flex gap-[8px] items-start justify-start"><span className="material-symbols-outlined">location_on</span>{`地址:${station.address}`}</li>
                  <li className="flex gap-[8px] items-start justify-start"><span className="material-symbols-outlined">call</span>{`電話:${formatPhoneNumber(station.phone)}`}</li>
                  <li className="flex gap-[8px] items-start justify-start">
                    <span className="material-symbols-outlined">schedule</span>
                    <p>{`營業時間:${getTodayOpenTime(station.station_daily_hours)}`}</p>
                    <button onClick={() => setIsAllOpenTime(!isAllOpenTime)}>
                      {isAllOpenTime ? <span className="material-symbols-outlined">keyboard_arrow_up</span> : <span className="material-symbols-outlined">keyboard_arrow_down</span>}
                    </button>
                  </li>
                  {isAllOpenTime && <ul className="flex flex-col items-center w-full gap-[8px]">
                    {formatOpenTime(station.station_daily_hours)}
                  </ul>}
                </ul>


                <div className="p-[16px] border border-solid border-[#B7B7B7] rounded-lg mb-[12px]">
                  <h6 className="mb-[12px]">回收認領資訊</h6>

                  <div className="flex gap-[25px] justify-center mb-[12px]">
                    {/* 可回收 */}
                    <div>
                      <p className="w-full text-center text-main-600 bg-main-100 rounded-lg py-[4px] mb-[8px]">可回收紙箱</p>
                      <div className="flex gap-[8px]">
                        <div className="text-main-600 bg-main-100 rounded-lg flex flex-col items-center p-[8px]">
                          <h4>{station.recyclable_boxes.S}</h4>
                          <p>S</p>
                        </div>
                        <div className="text-main-600 bg-main-100 rounded-lg flex flex-col items-center p-[8px]">
                          <h4>{station.recyclable_boxes.M}</h4>
                          <p>M</p>
                        </div>
                        <div className="text-main-600 bg-main-100 rounded-lg flex flex-col items-center p-[8px]">
                          <h4>{station.recyclable_boxes.L}</h4>
                          <p>L</p>
                        </div>
                        <div className="text-main-600 bg-main-100 rounded-lg flex flex-col items-center p-[8px]">
                          <h4>{station.recyclable_boxes.XL}</h4>
                          <p>XL</p>
                        </div>

                      </div>
                    </div>
                    {/* 可認領 */}
                    <div>
                      <p className="w-full text-center text-second-600 bg-second-100 rounded-lg py-[4px] mb-[8px]">可認領紙箱</p>
                      <div className="flex gap-[8px]">
                        <div className="text-second-600 bg-second-100 rounded-lg flex flex-col items-center p-[8px]">
                          <h4>{station.pending_boxes_s}</h4>
                          <p>S</p>
                        </div>
                        <div className="text-second-600 bg-second-100 rounded-lg flex flex-col items-center p-[8px]">
                          <h4>{station.pending_boxes_m}</h4>
                          <p>M</p>
                        </div>
                        <div className="text-second-600 bg-second-100 rounded-lg flex flex-col items-center p-[8px]">
                          <h4>{station.pending_boxes_l}</h4>
                          <p>L</p>
                        </div>
                        <div className="text-second-600 bg-second-100 rounded-lg flex flex-col items-center p-[8px]">
                          <h4>{station.pending_boxes_xl}</h4>
                          <p>XL</p>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#B7B7B7] pt-[12px]">
                    <div className="flex justify-between">
                      <p>查看紙箱尺寸</p>
                      <button onClick={() => setIsBoxSize(!isBoxSize)}>
                        {isBoxSize ? <span className="material-symbols-outlined">keyboard_arrow_up</span> : <span className="material-symbols-outlined">keyboard_arrow_down</span>}
                      </button>
                    </div>
                    {isBoxSize ? (
                      <ul className="text-[#6F6F6F] list-disc list-inside">
                        <li>小紙箱：總長 50 公分以下</li>
                        <li>中紙箱：總長 50 ~ 120 公分</li>
                        <li>大紙箱：總長 120 公分以上</li>
                      </ul>) : <></>
                    }


                  </div>
                </div>
                <NavLink className="btn" to={`/map/${station.id}`}>查看更多</NavLink>

              </div>
            </div>
          ) : '請選擇站點'}

        </div> : <></>}



        {/* 地圖 */}
        <MapContainer className="relative z-0"
          center={[stations[0].latitude, stations[0].longitude]} // 預設第一個站點
          zoom={15}
          style={{ height: '100%', width: "100%" }}
        >
          {/* 地圖圖層 */}
          <TileLayer
            url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
            attribution='Positron'
          />

          {/* 地圖上的標記 */}
          {
            stations.map(item => (
              <Marker icon={customIcon} position={[item.latitude, item.longitude]} key={item.id} eventHandlers={{
                click: () => {
                  setClickedId(item.id); // 設定選中的站點
                },
              }}>
                <Popup>
                  {station ?
                    (<div>
                      <h6 className='font-semibold text-start mb-[12px]'>{station.station_name}</h6>
                      <div className="flex gap-[8px] justify-center">
                        <span className="bg-main-200 py-[4px] px-[12px] rounded-full fs-7">{`可回收${countRecyclableBoxes(station)}個`}</span>
                        <span className="bg-second-200 py-[4px] px-[12px] rounded-full fs-7">{`可認領${countPendingBoxes(station)}個`}</span>
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

          {/* 側邊欄開關 */}
          <button className="absolute top-[273px] left-[0px] w-[40px] h-[72px] z-[999999999] bg-white border-t border-e border-b rounded-r-lg" onClick={() => setIsSideBar(!isSideBar)}>
            {isSideBar ? <span className="material-symbols-outlined">
              arrow_back_ios
            </span> : <span className="material-symbols-outlined">
              chevron_right
            </span>}
          </button>
        </MapContainer>
      </div>
    </>
  );
}

export default Map;
