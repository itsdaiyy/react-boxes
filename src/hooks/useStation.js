import { apiGetStationById } from "@/services/apiStations";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
/**
 * 自訂 Hook：使用 React Query 來取得單一站點資料
 *
 * 該 Hook 根據路由參數（`stationId`）或傳入的 `clickedId` 來向 API 請求站點資料，並處理資料加載與錯誤狀態。
 * - 若 `stationId` 存在於路由，會自動根據路由參數請求資料。
 * - 若使用者點擊後提供 `clickedId`，會根據該 `clickedId` 請求資料。
 *
 * @param {string|null} clickedId - 用戶點擊後傳入的站點 ID，若未點擊則為 `null`。這會作為優先於路由 ID 的請求參數。
 *
 * @returns {Object} 返回包含三個屬性的物件：
 *   - `station` {Object|null} - 單一站點資料物件，若尚未請求或發生錯誤則為 `null`。
 *   - `isLoadingStation` {boolean} - 是否正在加載資料。
 *   - `stationError` {Error|null} - 若請求發生錯誤，將包含錯誤物件，否則為 `null`。
 */
export function useStation(clickedId) {
  const { stationId: routeId } = useParams();

  const stationId = routeId || clickedId;

  const {
    data: station,
    isLoading: isLoadingStation,
    error: stationError,
  } = useQuery({
    queryKey: ["station", stationId],
    queryFn: () => apiGetStationById(stationId),
    enabled: !!stationId,
  });

  return { station, isLoadingStation, stationError };
}
