import { useState, useEffect, useRef } from "react";
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
import { stationInfoStyles, paginationComponentOptions } from "@/data/constants";

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


// 排序下拉選單
const Dropdown = ({setAvailableBoxes,availableBoxes }) => {
  const sortOptions = ["紙箱尺寸：由大到小", "紙箱尺寸：由小到大", "保存等級：由新至舊", "保存等級：由舊至新"];
  const [isOpen, setIsOpen] = useState(false); //開啟選單
  const [selected, setSelected] = useState(sortOptions[0]); //當前選擇
  const dropdownRef = useRef(null); //監聽選單區域，用於關閉選單

  //當點選畫面其他地方時關閉選單
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // 監聽 `mousedown` 事件
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // 清除事件監聽
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 點選時可以開啟或關閉選單
  const toggleDropdown = () => setIsOpen(!isOpen);

  // 執行排序
  const handleSelect = (option) => {
    setSelected(option);

    const sizeOrder = { "小": 1, "中": 2, "大": 3, "特大": 4 };
    const conditionOrder = { "差": 1, "普通": 2, "優": 3, "全新": 4 };

    let sortBoxes = [...availableBoxes];

    if (option === '紙箱尺寸：由小到大') {
      sortBoxes.sort((a, b) => sizeOrder[a.size] - sizeOrder[b.size]);
    } else if (option === '紙箱尺寸：由大到小') {
      sortBoxes.sort((a, b) => sizeOrder[b.size] - sizeOrder[a.size]);
    } else if (option === '保存等級：由新至舊') {
      sortBoxes.sort((a, b) => conditionOrder[b.condition] - conditionOrder[a.condition]);
    } else if (option === '保存等級：由舊至新') {
      sortBoxes.sort((a, b) => conditionOrder[a.condition] - conditionOrder[b.condition]);
    }

    setAvailableBoxes(sortBoxes);
    setIsOpen(false); // 選擇後關閉選單
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 下拉按鈕 */}
      <button
        onClick={toggleDropdown}
        className="bg-white border p-[12px] rounded-[8px] w-full flex justify-between gap-[114px] items-center"
      >
        {selected}
        <span className="material-symbols-outlined">
          keyboard_arrow_down
        </span>
      </button>

      {/* 下拉選單 */}
      {isOpen && (
        <div className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-[1000]">
          <div>
            {sortOptions.map((option, index) => (
              <div
                key={index}
                className="p-[12px] cursor-pointer hover:bg-main-100 text-[#6F6F6F] hover:text-black"
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


function StationInfo() {
  const params = useParams();
  const { station, isLoadingStation, stationError } = useStation();
  const { boxes, isLoadingBoxes, boxesError } = useBoxesForAdminManaging(params.stationId);

  const [availableBoxes, setAvailableBoxes] = useState();//儲存可以供認領的紙箱列表
  const [isAllOpenTime, setIsAllOpenTime] = useState(false); //開啟詳細營業時間

  useEffect(() => {
    if (boxes?.length || 0 > 0) {
      // 若boxes回傳為undefined則無法計算length會報錯，加?避免錯誤
      const available = boxes.filter((item) => item.status === '可認領');
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
    {
      name: "紙箱照片",
      selector: (row) => (
        <div className="py-[16px]">
          <img src={row.image_url} alt={`編號${row.id}：紙箱照片`} className="object-cover w-[100px] h-[100px]"></img>
        </div>)
    },
    { name: "紙箱編號", selector: (row) => row.id, sortable: false },
    { name: "紙箱大小", selector: (row) => row.size, sortable: false },
    {
      name: "紙箱保存等級",
      selector: (row) => row.condition,
      sortable: false,
    },
    { name: "兌換所需積分", selector: (row) => row.point_value, sortable: false },
    { name: "金額", selector: (row) => `NT$ ${row.cash_value}`, sortable: false },
  ];

  return (
    <>
      <Header />
      <main>
        {/* Section1 */}
        <div className="bg-second-100 py-[40px]">
          <div className="container mx-auto px-5">
            <NavLink
              to="/map"
              className="h5 mb-[24px] flex items-center gap-[4px] text-[#6F6F6F]"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              返回地圖
            </NavLink>
            <div className="flex flex-col lg:flex-row justify-between">
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
                    <button onClick={() => setIsAllOpenTime(!isAllOpenTime)} className="lg:hidden inline">
                      {isAllOpenTime ? <span className="material-symbols-outlined">keyboard_arrow_up</span> : <span className="material-symbols-outlined">keyboard_arrow_down</span>}
                    </button>
                  </li>
                  {isAllOpenTime && <ul className="flex flex-col items-center w-full gap-[8px] lg:hidden flex">
                    {formatOpenTime(station.station_daily_hours)}
                  </ul>}
                  <ul className="lg:flex w-full flex-col items-center gap-[8px] hidden">
                    {formatOpenTime(station.station_daily_hours)}
                  </ul>
                </ul>
              </div>
              {/* 地圖 */}
              <div className="lg:w-3/4 w-full h-[207px] lg:h-auto">
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
        <div className="container mx-auto px-5 py-[80px] ">
          <h4 className="mb-[24px]">回收認領資訊</h4>
          <div className="rounded-lg border border-[#B7B7B7] p-[16px]">
            <div className="mb-[12px] flex lg:flex-row flex-col justify-center gap-[25px]">
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
            <ul className="flex lg:flex-row flex-col list-inside list-disc gap-[16px] border-t border-[#B7B7B7] pt-[12px] text-[#6F6F6F]">
              <li>小紙箱：總長 50 公分以下</li>
              <li>中紙箱：總長 50 ~ 120 公分</li>
              <li>大紙箱：總長 120 公分以上</li>
            </ul>
          </div>
        </div>
        {/* Section3 */}
        <div className="container mx-auto px-5 pb-[80px]">
          <div className="flex lg:flex-row flex-col justify-between mb-[24px]">
            <h4 className="lg:mb-0 mb-[8px]">可認領紙箱列表</h4>
            <Dropdown setAvailableBoxes={setAvailableBoxes} availableBoxes={availableBoxes} ></Dropdown>
          </div>
          {/* lg以上顯示table */}
          <StyleSheetManager shouldForwardProp={isPropValid}>
            <div className="lg:block hidden">
            <DataTable
              columns={columns}
              data={availableBoxes}
              customStyles={stationInfoStyles}
              pagination
              paginationComponentOptions={paginationComponentOptions}
            />
            </div>
          </StyleSheetManager>
          {/* lg以下顯示card */}
          <div className="flex flex-col lg:hidden">
          {availableBoxes && availableBoxes.map((item)=>(
            <div key={item.id} className="border border-[#D9D9D9] py-[16px] px-[24px] flex gap-[16px] justify-start items-center">
              <img src={item.image_url} alt={`編號${item.id}：紙箱照片`} className="object-cover w-[100px] h-[100px]"></img>
              <div className="text-start">
                <p className="text-[#6F6F6F]">編號: <span className="text-[#000000]">{item.id}</span></p>
                <p className="text-[#6F6F6F]">尺寸: <span className="text-[#000000]">{item.size}</span></p>
                <p className="text-[#6F6F6F]">等級: <span className="text-[#000000]">{item.condition}</span></p>
                <p className="text-[#6F6F6F]">兌換積分: <span className="text-[#000000]">{item.point_value}</span></p>
                <p className="text-[#6F6F6F]">金額: <span className="text-[#000000]">{item.cash_value}</span></p>
              </div>
            </div>
          ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default StationInfo;
