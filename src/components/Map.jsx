import { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { NavLink } from "react-router-dom";
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
const UserLocation = ({ setUserLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          map.setView([latitude, longitude], 15); // 設定地圖中心到用戶位置
        },
        (error) => {
          console.error("無法獲取位置：", error);
        },
      );
    } else {
      console.error("瀏覽器不支援地理位置功能！");
    }
  }, [map]);

  return null; // 不需要渲染任何元素
};

// 建議站點卡
const SuggestionStationCard = ({ station, countRecyclableBoxes, countPendingBoxes, formatPhoneNumber, setClickedId, mapRef, setIsStationInfo }) => {
  const { latitude, longitude } = station; //取得經緯度

  //前往選擇站點定位
  const handleCheckStation = ({ station }) => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.setView([latitude, longitude], 15);
    }
  };

  return (
    <div className="p-[24px] border rounded-lg">
      <button onClick={() => handleCheckStation(station)}>
        <h5 className="mb-[12px]">{station.station_name}</h5>
      </button>
      <h5 className="mb-[12px] flex gap-[8px] text-base">
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
      </ul>
      <button className="btn" onClick={() => {
        setClickedId(station.id)
        setIsStationInfo(true)
      }}>站點資訊</button>
    </div>
  )
}

//側邊欄站點詳細資訊
const StationDetailedInfo = ({station,countRecyclableBoxes,countPendingBoxes,formatPhoneNumber,handleBackSuggestaion}) =>{

  const [isAllOpenTime, setIsAllOpenTime] = useState(false); //開啟詳細營業時間
  const [isBoxSize, setIsBoxSize] = useState(false); //開啟查看紙箱尺寸

  // 取得一週的營業時間
  const formatOpenTime = (station_daily_hours) => {
    return station_daily_hours.map((item, index) => {
      const openTime = item.open_time.replace(/^(\d{2}:\d{2}):\d{2}.*/, "$1");
      const closeTime = item.close_time.replace(/^(\d{2}:\d{2}):\d{2}.*/, "$1");

      if (index === 0) {
        return <li key={index}>{item?`星期日 ${openTime}-${closeTime}`:'休息'}</li>;
      } else if (index === 1) {
        return <li key={index}>{item?`星期一 ${openTime}-${closeTime}`:'休息'}</li>;
      } else if (index === 2) {
        return <li key={index}>{item? `星期二 ${openTime}-${closeTime}`:'休息'}</li>;
      } else if (index === 3) {
        return <li key={index}>{item? `星期三 ${openTime}-${closeTime}`:'休息'}</li>;
      } else if (index === 4) {
        return <li key={index}>{item? `星期四 ${openTime}-${closeTime}`:'休息'}</li>;
      } else if (index === 5) {
        return <li key={index}>{item? `星期五 ${openTime}-${closeTime}`:'休息'}</li>;
      } else {
        return <li key={index}>{item? `星期六 ${openTime}-${closeTime}`:'休息'}</li>;
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

  return (<div>
    <img
      src={station.image_url}
      alt={station.station_name}
      className="w-full object-cover"
    />
    <div className="p-[24px]">
      <h5 className="mb-[12px]">{station.station_name}</h5>
      <h5 className="mb-[12px] flex gap-[8px] text-base">
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
          <span className="material-symbols-outlined">
            schedule
          </span>
          <p>{`營業時間:${getTodayOpenTime(station.station_daily_hours)}`}</p>
          <button onClick={() => setIsAllOpenTime(!isAllOpenTime)}>
            {isAllOpenTime ? (
              <span className="material-symbols-outlined">
                keyboard_arrow_up
              </span>
            ) : (
              <span className="material-symbols-outlined">
                keyboard_arrow_down
              </span>
            )}
          </button>
        </li>
        {isAllOpenTime && (
          <ul className="flex w-full flex-col items-center gap-[8px]">
            {formatOpenTime(station.station_daily_hours)}
          </ul>
        )}
      </ul>

      <div className="mb-[24px] rounded-lg border border-solid border-[#B7B7B7] p-[16px]">
        <h6 className="mb-[12px]">回收認領資訊</h6>

        <div className="mb-[12px] flex justify-center gap-[25px]">
          {/* 可回收 */}
          <div>
            <p className="mb-[8px] w-full rounded-lg bg-main-100 py-[4px] text-center text-main-600">
              可回收紙箱
            </p>
            <div className="flex gap-[8px]">
              <div className="flex flex-col items-center rounded-lg bg-main-100 p-[8px] text-main-600">
                <h4>{station.available_slots.S}</h4>
                <p>S</p>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-main-100 p-[8px] text-main-600">
                <h4>{station.available_slots.M}</h4>
                <p>M</p>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-main-100 p-[8px] text-main-600">
                <h4>{station.available_slots.L}</h4>
                <p>L</p>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-main-100 p-[8px] text-main-600">
                <h4>{station.available_slots.XL}</h4>
                <p>XL</p>
              </div>
            </div>
          </div>
          {/* 可認領 */}
          <div>
            <p className="text-second-600 mb-[8px] w-full rounded-lg bg-second-100 py-[4px] text-center">
              可認領紙箱
            </p>
            <div className="flex gap-[8px]">
              <div className="text-second-600 flex flex-col items-center rounded-lg bg-second-100 p-[8px]">
                <h4>{station.pending_boxes_s}</h4>
                <p>S</p>
              </div>
              <div className="text-second-600 flex flex-col items-center rounded-lg bg-second-100 p-[8px]">
                <h4>{station.pending_boxes_m}</h4>
                <p>M</p>
              </div>
              <div className="text-second-600 flex flex-col items-center rounded-lg bg-second-100 p-[8px]">
                <h4>{station.pending_boxes_l}</h4>
                <p>L</p>
              </div>
              <div className="text-second-600 flex flex-col items-center rounded-lg bg-second-100 p-[8px]">
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
              {isBoxSize ? (
                <span className="material-symbols-outlined">
                  keyboard_arrow_up
                </span>
              ) : (
                <span className="material-symbols-outlined">
                  keyboard_arrow_down
                </span>
              )}
            </button>
          </div>
          {isBoxSize ? (
            <ul className="list-inside list-disc text-[#6F6F6F]">
              <li>小紙箱：總長 50 公分以下</li>
              <li>中紙箱：總長 50 ~ 120 公分</li>
              <li>大紙箱：總長 120 公分以上</li>
            </ul>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex gap-[8px]">
        <NavLink className="btn" to={`/map/${station.id}`}>
          查看更多
        </NavLink>
        <button className="btn" onClick={() => handleBackSuggestaion()}>
          返回建議站點列表
        </button>
      </div>
    </div>
  </div>)
}

//Popup
const PopupCard = ({station,countRecyclableBoxes,countPendingBoxes,setIsStationInfo,setIsSideBar,setClickedId})=>{
  return (<div>
    <h6 className="mb-[12px] text-start font-semibold">
      {station.station_name}
    </h6>
    <div className="flex justify-center gap-[8px]">
      <span className="fs-7 rounded-full bg-main-200 px-[12px] py-[4px]">{`可回收${countRecyclableBoxes(station)}個`}</span>
      <span className="fs-7 rounded-full bg-second-200 px-[12px] py-[4px]">{`可認領${countPendingBoxes(station)}個`}</span>
    </div>
    <p className="mb-[12px]">{station.address}</p>
    <button className="btn" onClick={() => {
      setClickedId(station.id);
      setIsStationInfo(true);
      setIsSideBar(true);
    }}>站點資訊</button>
  </div>)
}


function Map() {
  const mapRef = useRef(null); //取得地圖實例

  const [clickedId, setClickedId] = useState(null); //送入站點id，設定選擇站點
  const { stations, isLoadingStations, stationsError } = useStations(); //全部站點
  const { station, isLoadingStation, stationError } = useStation(clickedId); //所選擇的站點詳細資訊


  const [isSideBar, setIsSideBar] = useState(false); //開啟SideBar
  const [isStationInfo, setIsStationInfo] = useState(false);//開啟側邊欄站點資訊
  const [userLocation, setUserLocation] = useState([]); //儲存使用者定位
  const [nearestStations, setNearestStations] = useState([]); //儲存5筆鄰近站點
  const [popupStation,setPopupStation] = useState({});//儲存Popup站點資訊


  // 取得5筆鄰近站點
  useEffect(() => {
    if (userLocation.length > 0) {
      countDistance();
    }
  }, [userLocation])


  if (isLoadingStations) return <Spinner />;
  if (stationsError) return <ErrorMessage error={stationsError} />;

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
    return phone?.replace(/^\+886-/, "0").replace(/#$/, "");
  };

  // 設定icon
  const customIcon = new L.Icon({
    iconUrl: mapMark,
    iconSize: [40, 40],
  });

  // 回到使用者定位
  const handleLocateUser = () => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.setView(userLocation, 15);
    }
  };

  // 計算距離
  const countDistance = () => {
    const allDistance = stations.map((item) => ({
      ...item,
      distance: L.latLng(userLocation[0], userLocation[1]).distanceTo(L.latLng(item.latitude, item.longitude))
    }
    ))

    setNearestStations(allDistance.sort((a, b) => a.distance - b.distance).slice(0, 5));
  }

  //返回建議站點列表
  const handleBackSuggestaion = () => {
    setIsStationInfo(false);
    if (mapRef.current) {
      const map = mapRef.current;
      map.closePopup();
    }
  }

  return (
    <>
      <MapNav handleLocateUser={handleLocateUser} />

      <div
        className="relative mx-auto flex flex-col justify-between md:flex-row"
        style={{ height: "700px", width: "100%" }}
      >
        {/* 側邊欄 */}
        {isSideBar ? (
          <div className="w-[486px] flex-shrink-0 overflow-auto scrollbar">
            {isStationInfo && station ? (

              <StationDetailedInfo
              station={station}
              countRecyclableBoxes={countRecyclableBoxes}
              countPendingBoxes={countPendingBoxes}
              formatPhoneNumber={formatPhoneNumber}
              handleBackSuggestaion={handleBackSuggestaion}
              ></StationDetailedInfo>

            ) : (
              <div className="p-[24px] flex flex-col gap-[8px]">

                {nearestStations.map((item, index) => (
                  <SuggestionStationCard station={item} key={index}
                    countRecyclableBoxes={countRecyclableBoxes}
                    countPendingBoxes={countPendingBoxes}
                    formatPhoneNumber={formatPhoneNumber}
                    setClickedId={setClickedId}
                    mapRef={mapRef}
                    setIsStationInfo={setIsStationInfo} />))}

              </div>

            )}
          </div>
        ) : (
          <></>
        )}

        {/* 地圖 */}
        <MapContainer
          className="relative z-0"
          center={[stations[0].latitude, stations[0].longitude]} // 預設第一個站點
          zoom={15}
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
        >
          {/* 地圖圖層 */}
          <TileLayer
            url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
            attribution="Positron"
          />

          {/* 地圖上的標記 */}
          {stations.map((item) => (
            <Marker
              icon={customIcon}
              position={[item.latitude, item.longitude]}
              key={item.id}
              eventHandlers={{
                click: () => {
                  setPopupStation(item); // 設定選中的站點
                },
              }}
            >
              <Popup>
                {popupStation ? (
                  
                  <PopupCard
                  station={popupStation}
                  countRecyclableBoxes={countRecyclableBoxes}
                  countPendingBoxes={countPendingBoxes}
                  setIsStationInfo={setIsStationInfo}
                  setIsSideBar={setIsSideBar}
                  setClickedId={setClickedId}
                  ></PopupCard>
                  
                ) : (
                  ""
                )}
              </Popup>
            </Marker>
          ))}

          <UserLocation setUserLocation={setUserLocation} />

          {/* 側邊欄開關 */}
          <button
            className="absolute left-[0px] top-[273px] z-[999999999] h-[72px] w-[40px] rounded-r-lg border-b border-e border-t bg-white"
            onClick={() => setIsSideBar(!isSideBar)}
          >
            {isSideBar ? (
              <span className="material-symbols-outlined">arrow_back_ios</span>
            ) : (
              <span className="material-symbols-outlined">chevron_right</span>
            )}
          </button>
        </MapContainer>
      </div>
    </>
  );
}

export default Map;
