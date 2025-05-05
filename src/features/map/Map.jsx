import { useState, useEffect, useRef, useCallback } from "react";
import L from "leaflet";

import { useStations } from "@/hooks/stations/useStations";
import Spinner from "@/components/Spinner";
import ErrorMessage from "@/components/ErrorMessage";

import MapNav from "@/features/map/MapNav";
import MapBox from "@/features/map/MapBox";
import MapSideBar from "@/features/map/MapSideBar";

function Map() {
  const mapRef = useRef(null); //取得地圖實例
  const [clickedId, setClickedId] = useState(null); //送入站點id，設定選擇站點
  const { stations, isLoadingStations, stationsError } = useStations(); //全部站點
  const [isSideBar, setIsSideBar] = useState(false); //開啟SideBar
  const [isStationInfo, setIsStationInfo] = useState(false); //開啟側邊欄站點資訊
  const [userLocation, setUserLocation] = useState([]); //儲存使用者定位
  const [suggestionStations, setSuggestionStations] = useState([]); //儲存5筆鄰近站點
  const [popupStation, setPopupStation] = useState({}); //儲存Popup站點資訊
  const [searchKeyWords, setSearchKeyWords] = useState(""); //儲存使用者輸入的搜尋關鍵字
  const [availableTags, setAvailableTags] = useState([]); //儲存搜尋建議tags
  const [showSuggestedTags, setShowSuggestedTags] = useState(false); //顯示建議選項
  const [isLg, setIsLg] = useState(false); //畫面大小
  const markerRefs = useRef({}); //儲存所有的marker

  // 計算距離
  const countDistance = useCallback(() => {
    const allDistance = stations.map((item) => ({
      ...item,
      distance: L.latLng(userLocation[0], userLocation[1]).distanceTo(
        L.latLng(item.latitude, item.longitude),
      ),
    }));

    setSuggestionStations(
      allDistance.sort((a, b) => a.distance - b.distance).slice(0, 5),
    );
  }, [stations, userLocation]);

  //取得搜尋建議tags
  const getAvailableTags = useCallback(() => {
    let stationsName = stations.map((item) => item.station_name); // 取得所有站點名稱
    let stationsAddress = stations.map((item) => item.address); // 取得所有站點地址
    let tags = [...stationsName, ...stationsAddress]; //合併陣列
    setAvailableTags(tags); // 更新狀態
  }, [stations, setAvailableTags]);

  // 取得5筆鄰近站點
  useEffect(() => {
    if (userLocation.length > 0) {
      countDistance();
    }
  }, [userLocation, countDistance]);

  //取得搜尋建議tags
  useEffect(() => {
    if (stations) {
      getAvailableTags();
    }
  }, [stations, getAvailableTags]);

  // 畫面大小
  useEffect(() => {
    const checkSize = () => {
      if (window.innerWidth >= 992) {
        setIsLg(true);
      } else {
        setIsLg(false);
      }

      // console.log('Window width:', window.innerWidth >= 992);
    };

    checkSize(); // 初始化檢查

    window.addEventListener("resize", checkSize); // 當螢幕大小改變時更新狀態

    return () => window.removeEventListener("resize", checkSize);
  }, []);

  if (isLoadingStations) return <Spinner />;
  if (stationsError) return <ErrorMessage error={stationsError} />;

  // 回到使用者定位
  const handleLocateUser = () => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.setView(userLocation, 15);
    }
  };

  //執行搜尋
  const handleSearchStations = (e) => {
    e.preventDefault();
    const matchStations = stations.filter(
      (item) =>
        item.station_name.includes(searchKeyWords) ||
        item.address.includes(searchKeyWords),
    );
    setSuggestionStations(matchStations);
    setSearchKeyWords("");
    setIsSideBar(true);
    setShowSuggestedTags(false);
    setIsStationInfo(false);
  };

  return (
    <>
      <MapNav
        handleLocateUser={handleLocateUser}
        searchKeyWords={searchKeyWords}
        setSearchKeyWords={setSearchKeyWords}
        handleSearchStations={handleSearchStations}
        availableTags={availableTags}
        showSuggestedTags={showSuggestedTags}
        setShowSuggestedTags={setShowSuggestedTags}
      />
      <div className="relative flex justify-between overflow-hidden lg:flex-row">
        {/* SideBar */}
        {isSideBar ? (
          <MapSideBar
            clickedId={clickedId}
            setIsSideBar={setIsSideBar}
            mapRef={mapRef}
            isStationInfo={isStationInfo}
            setIsStationInfo={setIsStationInfo}
            setPopupStation={setPopupStation}
            suggestionStations={suggestionStations}
            setClickedId={setClickedId}
            isLg={isLg}
            markerRefs={markerRefs}
          ></MapSideBar>
        ) : (
          <></>
        )}

        {/* Map */}
        <MapBox
          stations={stations}
          setPopupStation={setPopupStation}
          isLg={isLg}
          setClickedId={setClickedId}
          setIsStationInfo={setIsStationInfo}
          setIsSideBar={setIsSideBar}
          mapRef={mapRef}
          markerRefs={markerRefs}
          popupStation={popupStation}
          setUserLocation={setUserLocation}
          isSideBar={isSideBar}
        ></MapBox>
      </div>
    </>
  );
}

export default Map;
