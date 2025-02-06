import { apiGetStationById } from "@/services/apiStations";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
/**
 * 自訂 Hook：使用 React Query 來取得單一站點資料
 *
 * 使用 `useQuery` 來向 API 請求站點資料，並處理資料加載與錯誤狀態。
 *
 * @returns {Object} 返回包含三個屬性的物件：
 *   - `station` {Object|null} - 單一站點資料物件，若尚未請求或發生錯誤則為 `null`
 *   - `isLoadingStation` {boolean} - 是否正在加載資料
 *   - `stationError` {Error|null} - 若請求發生錯誤，將包含錯誤物件，否則為 `null`
 */
export function useStation() {
  const { stationId } = useParams();

  const {
    data: station,
    isLoading: isLoadingStation,
    error: stationError,
  } = useQuery({
    queryKey: ["station", stationId],
    queryFn: () => apiGetStationById(stationId),
    retry: false,
  });

  return { station, isLoadingStation, stationError };
}
