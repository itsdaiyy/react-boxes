import { useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import {
  getPendingBoxes,
  countRecyclableBoxes,
  countPendingBoxes,
  formatPhoneNumber,
  getTodayOpenTime,
} from "@/utils/helpers";
import FormatOpenTime from "@/features/map/FormatOpenTime";

export default function StationDetailedInfo({
  station,
  handleBackSuggestaion,
}) {
  const [isAllOpenTime, setIsAllOpenTime] = useState(false); //開啟詳細營業時間
  const [isBoxSize, setIsBoxSize] = useState(false); //開啟查看紙箱尺寸

  const countsObj = getPendingBoxes(station.boxes);

  return (
    <div>
      {station.image_url && (
        <div className="aspect-[3/2] overflow-hidden">
          <img
            src={station.image_url}
            alt={station.station_name}
            className="h-full w-full object-cover object-center"
          />
        </div>
      )}
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
            <span className="material-symbols-outlined">location_on</span>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(station.address)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {`地址：${station.address}`}
            </a>
          </li>
          <li className="flex items-start justify-start gap-[8px]">
            <span className="material-symbols-outlined">call</span>
            <a
              href={`tel:${station.phone ? formatPhoneNumber(station.phone) : ""}`}
            >
              {`電話：${station.phone ? formatPhoneNumber(station.phone) : "尚未填寫"}`}
            </a>
          </li>
          <li className="flex items-start justify-start gap-[8px]">
            <span className="material-symbols-outlined">schedule</span>
            <p>{`營業時間：${getTodayOpenTime(station.station_daily_hours)}`}</p>
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
              {FormatOpenTime(station.station_daily_hours)}
            </ul>
          )}
        </ul>

        <div className="mb-[24px] rounded-lg border border-solid border-[#B7B7B7] p-[16px]">
          <h6 className="mb-[12px]">回收認領資訊</h6>

          <div className="mb-[12px] flex flex-col justify-center gap-[25px] lg:flex-row">
            {/* 可回收 */}
            <div>
              <p className="mb-[8px] w-full rounded-lg bg-main-100 py-[4px] text-center text-main-600">
                可回收紙箱
              </p>
              <div className="flex gap-[8px]">
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
            <div>
              <p className="text-second-600 mb-[8px] w-full rounded-lg bg-second-100 py-[4px] text-center">
                可認領紙箱
              </p>
              <div className="flex gap-[8px]">
                <div className="text-second-600 flex w-full flex-col items-center rounded-lg bg-second-100 p-[8px]">
                  <h4>{countsObj["小"] || 0}</h4>
                  <p>S</p>
                </div>
                <div className="text-second-600 flex w-full flex-col items-center rounded-lg bg-second-100 p-[8px]">
                  <h4>{countsObj["中"] || 0}</h4>
                  <p>M</p>
                </div>
                <div className="text-second-600 flex w-full flex-col items-center rounded-lg bg-second-100 p-[8px]">
                  <h4>{countsObj["大"] || 0}</h4>
                  <p>L</p>
                </div>
                <div className="text-second-600 flex w-full flex-col items-center rounded-lg bg-second-100 p-[8px]">
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
        <div className="flex flex-col gap-[8px] text-center md:flex-row">
          <NavLink className="btn" to={`/map/${station.id}`}>
            查看本站紙箱列表
          </NavLink>
          <button className="btn" onClick={() => handleBackSuggestaion()}>
            返回搜尋結果
          </button>
        </div>
      </div>
    </div>
  );
}

StationDetailedInfo.propTypes = {
  station: PropTypes.shape({
    id: PropTypes.string,
    boxes: PropTypes.array,
    image_url: PropTypes.string,
    station_name: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    station_daily_hours: PropTypes.object,
    available_slots: PropTypes.shape({
      S: PropTypes.number,
      M: PropTypes.number,
      L: PropTypes.number,
      XL: PropTypes.number,
    }),
  }),
  handleBackSuggestaion: PropTypes.func,
};
