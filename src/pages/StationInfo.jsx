import ErrorMessage from "@/components/ErrorMessage";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import { useStation } from "@/hooks/useStation";
import { NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
// Map
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent, } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import mapMark from "../assets/mapMark.png";


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


function StationInfo() {
  const { station, isLoadingStation, stationError } = useStation();

  if (isLoadingStation) return <Spinner />;
  if (stationError) return <ErrorMessage errorMessage={stationError.message} />;

  // 設定icon
  const customIcon = new L.Icon({
    iconUrl: mapMark,
    iconSize: [40, 40],
  });

  return (
    <>
      <Header />
      <main>
        {/* Section1 */}
        <div className="bg-second-100 py-[40px]">
          <div className="container mx-auto ">
            <NavLink to='/map' className='h5 flex items-center gap-[4px] text-[#6F6F6F] mb-[24px]'><span className="material-symbols-outlined">arrow_back</span>返回地圖</NavLink>
            <div className="flex justify-between">
              {/* 站點資訊 */}
              <div>
                <h2 className="mb-[24px]">{station.station_name}</h2>
                <h5 className="text-base flex gap-[8px] mb-[24px]">
                  {countRecyclableBoxes(station) ? <span className="rounded-full bg-main-200 py-[4px] px-[12px] fs-7">可認領</span> : <></>}
                  {countPendingBoxes(station) ? <span className="rounded-full bg-second-200 py-[4px] px-[12px] fs-7">可認領</span> : <></>}
                </h5>
                <ul className="fs-6 text-[#6F6F6F] flex flex-col gap-[12px] mb-[12px]">
                  <li className="flex gap-[8px] items-start justify-start"><span className="material-symbols-outlined">location_on</span>{`地址:${station.address}`}</li>
                  <li className="flex gap-[8px] items-start justify-start"><span className="material-symbols-outlined">call</span>{`電話:${formatPhoneNumber(station.phone)}`}</li>
                  <li className="flex gap-[8px] items-start justify-start">
                    <span className="material-symbols-outlined">schedule</span>
                    <p>{`營業時間:${getTodayOpenTime(station.station_daily_hours)}`}</p>
                    {/* <button onClick={() => setIsAllOpenTime(!isAllOpenTime)}>
                      {isAllOpenTime ? <span className="material-symbols-outlined">keyboard_arrow_up</span> : <span className="material-symbols-outlined">keyboard_arrow_down</span>}
                    </button> */}
                  </li>
                  {/* {isAllOpenTime && <ul className="flex flex-col items-center w-full gap-[8px]">
                    {formatOpenTime(station.station_daily_hours)}
                  </ul>} */}
                  <ul className="flex flex-col items-center w-full gap-[8px]">
                    {formatOpenTime(station.station_daily_hours)}
                  </ul>
                </ul>
              </div>
              {/* 地圖 */}
              <div className="w-3/4">
                <MapContainer
                  center={[station.latitude, station.longitude]}
                  zoom={15}
                  style={{ height: '100%', width: "100%" }}
                >
                  {/* 地圖圖層 */}
                  <TileLayer
                    url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                    attribution='Positron'
                  />

                  {/* 地圖上的標記 */}
                  <Marker icon={customIcon} position={[station.latitude, station.longitude]}>
                    <Popup>
                      <a href={`https://www.google.com/maps?q=${station.latitude},${station.longitude}`} target="_blank">
                        在Google地圖中開啟
                      </a>
                    </Popup>
                  </Marker>

                </MapContainer>
              </div>

            </div>
          </div>
        </div>
        {/* Section2 */}
        <div className="container mx-auto py-[80px]">
          <h4 className="mb-[24px]">回收認領資訊</h4>
          <div className="border border-[#B7B7B7] rounded-lg p-[16px]">
            <div className="flex gap-[25px] justify-center mb-[12px]">
              {/* 可回收 */}
              <div className="w-full">
                <p className="w-full text-center text-main-600 bg-main-100 rounded-lg py-[4px] mb-[8px]">可回收紙箱</p>
                <div className="flex gap-[8px] w-full">
                  <div className="text-main-600 bg-main-100 rounded-lg flex flex-col items-center p-[8px] w-full">
                    <h4>{station.recyclable_boxes.S}</h4>
                    <p>S</p>
                  </div>
                  <div className="text-main-600 bg-main-100 rounded-lg flex flex-col items-center p-[8px] w-full">
                    <h4>{station.recyclable_boxes.M}</h4>
                    <p>M</p>
                  </div>
                  <div className="text-main-600 bg-main-100 rounded-lg flex flex-col items-center p-[8px] w-full">
                    <h4>{station.recyclable_boxes.L}</h4>
                    <p>L</p>
                  </div>
                  <div className="text-main-600 bg-main-100 rounded-lg flex flex-col items-center p-[8px] w-full">
                    <h4>{station.recyclable_boxes.XL}</h4>
                    <p>XL</p>
                  </div>

                </div>
              </div>
              {/* 可認領 */}
              <div className="w-full">
                <p className="w-full text-center text-second-600 bg-second-100 rounded-lg py-[4px] mb-[8px]">可認領紙箱</p>
                <div className="flex gap-[8px] w-full">
                  <div className="text-second-600 bg-second-100 rounded-lg flex flex-col items-center p-[8px] w-full">
                    <h4>{station.pending_boxes_s}</h4>
                    <p>S</p>
                  </div>
                  <div className="text-second-600 bg-second-100 rounded-lg flex flex-col items-center p-[8px] w-full">
                    <h4>{station.pending_boxes_m}</h4>
                    <p>M</p>
                  </div>
                  <div className="text-second-600 bg-second-100 rounded-lg flex flex-col items-center p-[8px] w-full">
                    <h4>{station.pending_boxes_l}</h4>
                    <p>L</p>
                  </div>
                  <div className="text-second-600 bg-second-100 rounded-lg flex flex-col items-center p-[8px] w-full">
                    <h4>{station.pending_boxes_xl}</h4>
                    <p>XL</p>
                  </div>

                </div>
              </div>
            </div>
            <ul className="text-[#6F6F6F] border-t border-[#B7B7B7] pt-[12px] flex gap-[16px] list-disc list-inside">
                        <li>小紙箱：總長 50 公分以下</li>
                        <li>中紙箱：總長 50 ~ 120 公分</li>
                        <li>大紙箱：總長 120 公分以上</li>
            </ul>
          </div>
        </div>
        {/* Section3 */}
        <div className="container mx-auto py-[80px]">
        <h4 className="mb-[24px]">可認領紙箱列表</h4>
        </div>
      </main>
    </>
  );
}

export default StationInfo;
