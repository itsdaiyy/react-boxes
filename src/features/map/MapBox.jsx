import {  useEffect } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
  } from "react-leaflet";
  import "leaflet/dist/leaflet.css";
  import L from "leaflet";

  import mapMark from "@/assets/mapMark.png";

  import { countRecyclableBoxes,countPendingBoxes } from "@/utils/helpers";


// 取得使用者定位
const UserLocation = ({ setUserLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          map.setView([latitude, longitude], 12); // 設定地圖中心到用戶位置
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

//Popup
const PopupCardLg = ({
  station,
  setIsStationInfo,
  setIsSideBar,
  setClickedId,
}) => {
  return (
    <div>
      <h6 className="mb-[12px] text-start font-semibold">
        {station.station_name}
      </h6>
      <div className="flex justify-center gap-[8px]">
        <span className="fs-7 rounded-full bg-main-200 px-[12px] py-[4px]">{`可回收${countRecyclableBoxes(station)}個`}</span>
        <span className="fs-7 rounded-full bg-second-200 px-[12px] py-[4px]">{`可認領${countPendingBoxes(station)}個`}</span>
      </div>
      <p className="mb-[12px]">{station.address}</p>
      <button
        className="btn w-full"
        onClick={() => {
          setClickedId(station.id);
          setIsStationInfo(true);
          setIsSideBar(true);
        }}
      >
        站點資訊
      </button>
    </div>
  );
};

const PopupCard = ({ station}) => {
  return (
    <div>
      <h6 className="mb-[12px] text-start font-semibold">
        {station.station_name}
      </h6>
      <div className="flex justify-center gap-[8px]">
        {countRecyclableBoxes(station) && (
          <span className="fs-7 rounded-full bg-main-200 px-[12px] py-[4px]">
            可回收
          </span>
        )}
        {countPendingBoxes(station) && (
          <span className="fs-7 rounded-full bg-second-200 px-[12px] py-[4px]">
            可認領
          </span>
        )}
        {/* <span className="fs-7 rounded-full bg-main-200 px-[12px] py-[4px]">{`可回收${countRecyclableBoxes(station)}個`}</span>
      <span className="fs-7 rounded-full bg-second-200 px-[12px] py-[4px]">{`可認領${countPendingBoxes(station)}個`}</span> */}
      </div>
    </div>
  );
};


export default function MapBox({ stations,setPopupStation, isLg, setClickedId,
    setIsStationInfo,setIsSideBar,mapRef,markerRefs,popupStation,
    setUserLocation,isSideBar}) {

    // 設定icon、站點名稱
  const createCustomIcon = (name) => {
    return L.divIcon({
      className: "custom-marker",
      html: `<div style="text-align: center;width:max-content">
                <img src=${mapMark} style='margin:0 auto' />
                <h6 style="color: #9F815B; font-size: 14px;">${name}</h6>
             </div>`,
      iconSize: [40, 41], // 調整圖標大小
      iconAnchor: [20, 41], // 調整圖標的錨點
      popupAnchor: [0, -41], // 調整彈出視窗位置
    });
  };


    // Marker在不同螢幕下的執行動作
    const handleMarkerClick = (item) => {
        setPopupStation(item); // 設定選中的站點
        if (!isLg) {
            // 在小螢幕上直接開啟側邊欄
            setClickedId(item.id);
            setIsStationInfo(true);
            setIsSideBar(true);
        }
    };

    return (
        <div className="relative z-0 h-[calc(100vh-408.2px)] w-full md:h-[calc(100vh-264.2px)] lg:h-[700px]">
            <MapContainer
                // className="relative z-0"
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
                        icon={createCustomIcon(item.station_name)}
                        position={[item.latitude, item.longitude]}
                        key={item.id}
                        ref={(el) => (markerRefs.current[item.id] = el)} // 儲存 Marker 參照
                        eventHandlers={{
                            click: () => {
                                handleMarkerClick(item); // 設定選中的站點
                            },
                        }}
                    >
                        {isLg ? (
                            <Popup>
                                {popupStation ? (
                                    <PopupCardLg
                                        station={popupStation}
                                        setIsStationInfo={setIsStationInfo}
                                        setIsSideBar={setIsSideBar}
                                        setClickedId={setClickedId}
                                    ></PopupCardLg>
                                ) : (
                                    <p>載入中...</p>
                                )}
                            </Popup>
                        ) : (
                            <Popup>
                                {popupStation ? (
                                    <PopupCard
                                        station={popupStation}
                                    ></PopupCard>
                                ) : (
                                    <p>載入中...</p>
                                )}
                            </Popup>
                        )}
                    </Marker>
                ))}

                <UserLocation setUserLocation={setUserLocation} />

                {/* 側邊欄開關 */}
                <button
                    className="absolute left-[0px] top-[273px] z-[999999999] hidden h-[72px] w-[40px] rounded-r-lg border-b border-e border-t bg-white lg:inline"
                    onClick={() => {
                        setIsSideBar(!isSideBar)
                        setTimeout(() => {
                            mapRef.current.invalidateSize(true);
                        }, 10);
                    }}
                >
                    {isSideBar ? (
                        <span className="material-symbols-outlined">chevron_left</span>
                    ) : (
                        <span className="material-symbols-outlined">chevron_right</span>
                    )}
                </button>
            </MapContainer>
        </div>
    )
}