import { useState, useEffect } from "react";
// 取得站點id
import { NavLink, useParams } from "react-router-dom";
// API
import ErrorMessage from "@/components/ErrorMessage";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import { useBoxesForAdminManaging } from "@/hooks/useBoxes";
import { useStation } from "@/hooks/useStation";

// React Data Table Component
import DataTable from "react-data-table-component";
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import { customStyles, paginationComponentOptions } from "@/data/constants";

// Map
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import mapMark from "../assets/mapMark.png";

// 資料處理
// 計算紙箱數量
const countRecyclableBoxes = (station) => {
  return (
    station.available_slots.XL +
    station.available_slots.L +
    station.available_slots.M +
    station.available_slots.S
  );
};

const countPendingBoxes = (station) => {
  return (
    station.pending_boxes_xl +
    station.pending_boxes_l +
    station.pending_boxes_m +
    station.pending_boxes_s
  );
};
// 電話國際碼轉換市碼
const formatPhoneNumber = (phone) => {
  return phone.replace(/^\+886-/, "0").replace(/#$/, "");
};
// 取得一週的營業時間
const formatOpenTime = (station_daily_hours) => {
  return station_daily_hours.map((item, index) => {
    const openTime = item.open_time.replace(/^(\d{2}:\d{2}):\d{2}.*/, "$1");
    const closeTime = item.close_time.replace(/^(\d{2}:\d{2}):\d{2}.*/, "$1");

    if (index === 0) {
      return <li key={index}>{`星期日 ${openTime}-${closeTime}`}</li>;
    } else if (index === 1) {
      return <li key={index}>{`星期一 ${openTime}-${closeTime}`}</li>;
    } else if (index === 2) {
      return <li key={index}>{`星期二 ${openTime}-${closeTime}`}</li>;
    } else if (index === 3) {
      return <li key={index}>{`星期三 ${openTime}-${closeTime}`}</li>;
    } else if (index === 4) {
      return <li key={index}>{`星期四 ${openTime}-${closeTime}`}</li>;
    } else if (index === 5) {
      return <li key={index}>{`星期五 ${openTime}-${closeTime}`}</li>;
    } else {
      return <li key={index}>{`星期六 ${openTime}-${closeTime}`}</li>;
    }
  });
};
// 取得本日營業時間
const getTodayOpenTime = (station_daily_hours) => {
  const today = new Date().getDay();
  let todayOpenTime = "";
  station_daily_hours.forEach((item, index) => {
    const openTime = item.open_time.replace(/^(\d{2}:\d{2}):\d{2}.*/, "$1");
    const closeTime = item.close_time.replace(/^(\d{2}:\d{2}):\d{2}.*/, "$1");

    if (today === index) {
      todayOpenTime = `${openTime}-${closeTime}`;
    }
  });

  return todayOpenTime;
};

function StationInfo() {
  const params = useParams();
  const { station, isLoadingStation, stationError } = useStation();
  const { boxes, isLoadingBoxes, boxesError } = useBoxesForAdminManaging(params.stationId);
  
  const [availableBoxes,setAvailableBoxes] = useState();

  useEffect(() => {
    if (boxes?.length || 0 > 0) {
      // 若boxes回傳為undefined則無法計算length會報錯，加?避免錯誤
      const available = boxes.filter((item)=>item.status === '可認領');
      setAvailableBoxes(available);
    }
  }, [boxes]);

  if (isLoadingStation) return <Spinner />;
  if (stationError) return <ErrorMessage errorMessage={stationError.message} />;
  if (isLoadingBoxes) return <Spinner />;
  if (boxesError) return <ErrorMessage errorMessage={boxesError.message} />;



  // 設定icon
  const customIcon = new L.Icon({
    iconUrl: mapMark,
    iconSize: [40, 40],
  });

  //欄位
  const columns = [
      {name:"紙箱照片",
      selector: (row) => (
      <div className="py-[16px]">
        <img src={row.image_url} alt={`編號${row.id}：紙箱照片`}></img>
        </div>)},
      { name: "紙箱編號", selector: (row) => row.id, sortable: true },
      { name: "紙箱大小", selector: (row) => row.size, sortable: true },
      {
        name: "紙箱保存等級",
        selector: (row) => row.condition,
        sortable: true,
      },
      { name: "兌換所需積分", selector: (row) => row.point_value, sortable: true },
      { name: "金額", selector: (row) => `NT$ ${row.cash_value}`, sortable: true },
    ];

  return (
    <>
      <Header />
      <main>
        {/* Section1 */}
        <div className="bg-second-100 py-[40px]">
          <div className="container mx-auto">
            <NavLink
              to="/map"
              className="h5 mb-[24px] flex items-center gap-[4px] text-[#6F6F6F]"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              返回地圖
            </NavLink>
            <div className="flex justify-between">
              {/* 站點資訊 */}
              <div>
                <h2 className="mb-[24px]">{station.station_name}</h2>
                <h5 className="mb-[24px] flex gap-[8px] text-base">
                  {countRecyclableBoxes(station) ? (
                    <span className="fs-7 rounded-full bg-main-200 px-[12px] py-[4px]">
                      可回收
                    </span>
                  ) : (
                    <></>
                  )}
                  {countPendingBoxes(station) ? (
                    <span className="fs-7 rounded-full bg-second-200 px-[12px] py-[4px]">
                      可認領
                    </span>
                  ) : (
                    <></>
                  )}
                </h5>
                <ul className="fs-6 mb-[12px] flex flex-col gap-[12px] text-[#6F6F6F]">
                  <li className="flex items-start justify-start gap-[8px]">
                    <span className="material-symbols-outlined">
                      location_on
                    </span>
                    {`地址:${station.address}`}
                  </li>
                  <li className="flex items-start justify-start gap-[8px]">
                    <span className="material-symbols-outlined">call</span>
                    {`電話:${station.phone ? formatPhoneNumber(station.phone) : '尚未填寫'}`}
                  </li>
                  <li className="flex items-start justify-start gap-[8px]">
                    <span className="material-symbols-outlined">schedule</span>
                    <p>{`營業時間:${getTodayOpenTime(station.station_daily_hours)}`}</p>
                    {/* <button onClick={() => setIsAllOpenTime(!isAllOpenTime)}>
                      {isAllOpenTime ? <span className="material-symbols-outlined">keyboard_arrow_up</span> : <span className="material-symbols-outlined">keyboard_arrow_down</span>}
                    </button> */}
                  </li>
                  {/* {isAllOpenTime && <ul className="flex flex-col items-center w-full gap-[8px]">
                    {formatOpenTime(station.station_daily_hours)}
                  </ul>} */}
                  <ul className="flex w-full flex-col items-center gap-[8px]">
                    {formatOpenTime(station.station_daily_hours)}
                  </ul>
                </ul>
              </div>
              {/* 地圖 */}
              <div className="w-3/4">
                <MapContainer
                  center={[station.latitude, station.longitude]}
                  zoom={15}
                  style={{ height: "100%", width: "100%" }}
                >
                  {/* 地圖圖層 */}
                  <TileLayer
                    url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                    attribution="Positron"
                  />

                  {/* 地圖上的標記 */}
                  <Marker
                    icon={customIcon}
                    position={[station.latitude, station.longitude]}
                  >
                    <Popup>
                      <a
                        href={`https://www.google.com/maps?q=${station.latitude},${station.longitude}`}
                        target="_blank"
                      >
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
          <div className="rounded-lg border border-[#B7B7B7] p-[16px]">
            <div className="mb-[12px] flex justify-center gap-[25px]">
              {/* 可回收 */}
              <div className="w-full">
                <p className="mb-[8px] w-full rounded-lg bg-main-100 py-[4px] text-center text-main-600">
                  可回收紙箱
                </p>
                <div className="flex w-full gap-[8px]">
                  <div className="flex w-full flex-col items-center rounded-lg bg-main-100 p-[8px] text-main-600">
                    <h4>{station.available_slots.S}</h4>
                    <p>S</p>
                  </div>
                  <div className="flex w-full flex-col items-center rounded-lg bg-main-100 p-[8px] text-main-600">
                    <h4>{station.available_slots.M}</h4>
                    <p>M</p>
                  </div>
                  <div className="flex w-full flex-col items-center rounded-lg bg-main-100 p-[8px] text-main-600">
                    <h4>{station.available_slots.L}</h4>
                    <p>L</p>
                  </div>
                  <div className="flex w-full flex-col items-center rounded-lg bg-main-100 p-[8px] text-main-600">
                    <h4>{station.available_slots.XL}</h4>
                    <p>XL</p>
                  </div>
                </div>
              </div>
              {/* 可認領 */}
              <div className="w-full">
                <p className="text-second-600 mb-[8px] w-full rounded-lg bg-second-100 py-[4px] text-center">
                  可認領紙箱
                </p>
                <div className="flex w-full gap-[8px]">
                  <div className="text-second-600 flex w-full flex-col items-center rounded-lg bg-second-100 p-[8px]">
                    <h4>{station.pending_boxes_s}</h4>
                    <p>S</p>
                  </div>
                  <div className="text-second-600 flex w-full flex-col items-center rounded-lg bg-second-100 p-[8px]">
                    <h4>{station.pending_boxes_m}</h4>
                    <p>M</p>
                  </div>
                  <div className="text-second-600 flex w-full flex-col items-center rounded-lg bg-second-100 p-[8px]">
                    <h4>{station.pending_boxes_l}</h4>
                    <p>L</p>
                  </div>
                  <div className="text-second-600 flex w-full flex-col items-center rounded-lg bg-second-100 p-[8px]">
                    <h4>{station.pending_boxes_xl}</h4>
                    <p>XL</p>
                  </div>
                </div>
              </div>
            </div>
            <ul className="flex list-inside list-disc gap-[16px] border-t border-[#B7B7B7] pt-[12px] text-[#6F6F6F]">
              <li>小紙箱：總長 50 公分以下</li>
              <li>中紙箱：總長 50 ~ 120 公分</li>
              <li>大紙箱：總長 120 公分以上</li>
            </ul>
          </div>
        </div>
        {/* Section3 */}
        <div className="container mx-auto py-[80px]">
          <h4 className="mb-[24px]">可認領紙箱列表</h4>
          <StyleSheetManager shouldForwardProp={isPropValid}>
        <DataTable
          columns={columns}
          data={availableBoxes}
          customStyles={customStyles}
          pagination
          paginationComponentOptions={paginationComponentOptions}
        />
      </StyleSheetManager>
        </div>
      </main>
    </>
  );
}

export default StationInfo;
