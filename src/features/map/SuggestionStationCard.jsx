import { useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import {
  getPendingBoxes,
  countRecyclableBoxes,
  countPendingBoxes,
  formatPhoneNumber,
} from "@/utils/helpers";

export default function SuggestionStationCard({
  station,
  setClickedId,
  mapRef,
  setIsStationInfo,
  isLg,
  setIsSideBar,
  markerRefs,
  setPopupStation,
}) {
  const { latitude, longitude } = station; //取得經緯度
  const [isBoxSize, setIsBoxSize] = useState(false); //開啟查看紙箱尺寸

  const countsObj = getPendingBoxes(station.boxes);

  //前往選擇站點定位
  const handleCheckStation = () => {
    setPopupStation(station); // 設定選中的站點

    if (mapRef.current && isLg) {
      const map = mapRef.current;
      map.setView([latitude, longitude], 15);
    } else if (mapRef.current) {
      const map = mapRef.current;
      map.setView([latitude, longitude], 15);
      setIsSideBar(false);
    }

    // 開啟對應站點的 Popup
    if (markerRefs.current[station.id]) {
      markerRefs.current[station.id].openPopup();
    }
  };

  return (
    <div className="rounded-lg border p-[24px]">
      <button onClick={() => handleCheckStation()}>
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
          <span className="material-symbols-outlined">location_on</span>
          {`地址:${station.address}`}
        </li>
        <li className="flex items-start justify-start gap-[8px]">
          <span className="material-symbols-outlined">call</span>
          {`電話:${station.phone ? formatPhoneNumber(station.phone) : "尚未填寫"}`}
        </li>
      </ul>

      <div className="mb-[24px] rounded-lg border border-solid border-[#B7B7B7] p-[16px]">
        <h6 className="mb-[12px]">回收認領資訊</h6>

        <div className="mb-[12px] flex flex-col justify-center gap-[8px] lg:flex-row">
          {/* 可回收 */}
          <div className="w-full">
            <p className="mb-[8px] w-full rounded-lg bg-main-100 py-[4px] text-center text-main-600">
              可回收紙箱
            </p>
            <div className="flex w-full gap-[4px]">
              <div className="flex w-full flex-col items-center rounded-lg bg-main-100 p-[6px] text-main-600">
                <h4>{station.available_slots.S}</h4>
                <p>S</p>
              </div>
              <div className="flex w-full flex-col items-center rounded-lg bg-main-100 p-[6px] text-main-600">
                <h4>{station.available_slots.M}</h4>
                <p>M</p>
              </div>
              <div className="flex w-full flex-col items-center rounded-lg bg-main-100 p-[6px] text-main-600">
                <h4>{station.available_slots.L}</h4>
                <p>L</p>
              </div>
              <div className="flex w-full flex-col items-center rounded-lg bg-main-100 p-[6px] text-main-600">
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
            <div className="flex w-full gap-[4px]">
              <div className="text-second-600 flex w-full flex-col items-center rounded-lg bg-second-100 p-[6px]">
                <h4>{countsObj["小"] || 0}</h4>
                <p>S</p>
              </div>
              <div className="text-second-600 flex w-full flex-col items-center rounded-lg bg-second-100 p-[6px]">
                <h4>{countsObj["中"] || 0}</h4>
                <p>M</p>
              </div>
              <div className="text-second-600 flex w-full flex-col items-center rounded-lg bg-second-100 p-[6px]">
                <h4>{countsObj["大"] || 0}</h4>
                <p>L</p>
              </div>
              <div className="text-second-600 flex w-full flex-col items-center rounded-lg bg-second-100 p-[6px]">
                <h4>{countsObj["特大"] || 0}</h4>
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

      <div className="flex flex-col gap-[12px] text-center md:flex-row">
        <button
          className="btn"
          onClick={() => {
            setClickedId(station.id);
            setIsStationInfo(true);
          }}
        >
          站點資訊
        </button>
        <NavLink className="btn" to={`/map/${station.id}`}>
          查看本站紙箱列表
        </NavLink>
      </div>
    </div>
  );
}

SuggestionStationCard.propTypes = {
  station: PropTypes.array,
  setClickedId:PropTypes.func,
  mapRef:PropTypes.object,
  setIsStationInfo:PropTypes.func,
  isLg:PropTypes.bool,
  setIsSideBar:PropTypes.func,
  markerRefs:PropTypes.object,
  setPopupStation:PropTypes.func,
}
