import { useStation } from "@/hooks/stations/useStation";
import PropTypes from "prop-types";

import SuggestionStationCard from "@/features/map/SuggestionStationCard";
import StationDetailedInfo from "@/features/map/StationDetailedInfo";
import NotFoundStation from "./NotFoundStation";

export default function MapSideBar({
  setIsSideBar,
  mapRef,
  isStationInfo,
  setIsStationInfo,
  setPopupStation,
  suggestionStations,
  setClickedId,
  isLg,
  markerRefs,
  clickedId,
}) {
  const { station } = useStation(clickedId); //所選擇的站點詳細資訊

  //返回建議站點列表
  const handleBackSuggestaion = () => {
    setIsStationInfo(false);
    setPopupStation(null); // 確保 popupStation 清空
    if (mapRef.current) {
      const map = mapRef.current;
      map.closePopup();
    }
  };

  return (
    <div className="w-full flex-shrink-0 overflow-auto lg:w-[486px]">
      <button
        className="flex gap-[12px] px-[24px] py-[24px] lg:hidden"
        onClick={() => {
          setIsSideBar(false);
          setTimeout(() => {
            mapRef.current.invalidateSize(true);
          }, 10);
        }}
      >
        <span className="material-symbols-outlined">arrow_back</span>
        <h5>回到地圖</h5>
      </button>

      {isStationInfo && station ? (
        <StationDetailedInfo
          station={station}
          handleBackSuggestaion={handleBackSuggestaion}
        ></StationDetailedInfo>
      ) : (
        <div className="flex h-full flex-col gap-[8px] p-[24px] pt-0 lg:p-[24px]">
          {suggestionStations.length > 0 ? (
            suggestionStations.map((item, index) => (
              <SuggestionStationCard
                station={item}
                key={index}
                setClickedId={setClickedId}
                mapRef={mapRef}
                setIsStationInfo={setIsStationInfo}
                setIsSideBar={setIsSideBar}
                isLg={isLg}
                markerRefs={markerRefs}
                setPopupStation={setPopupStation}
              />
            ))
          ) : (
            <NotFoundStation></NotFoundStation>
          )}
        </div>
      )}
    </div>
  );
}

MapSideBar.propTypes = {
  setIsSideBar: PropTypes.func,
  mapRef: PropTypes.object,
  isStationInfo: PropTypes.bool,
  setIsStationInfo: PropTypes.func,
  setPopupStation: PropTypes.func,
  suggestionStations: PropTypes.array,
  setClickedId: PropTypes.func,
  isLg: PropTypes.bool,
  markerRefs: PropTypes.object,
  clickedId: PropTypes.string,
};
