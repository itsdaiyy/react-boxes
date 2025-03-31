import { apiGetStations } from "@/services/apiStations";
import { useQuery } from "@tanstack/react-query";
/**
 * 自訂 Hook：使用 React Query 來取得站點資料
 *
 * 使用 `useQuery` 來向 API 請求站點資料，並處理資料加載與錯誤狀態。
 *
 * @returns {Object} 返回包含三個屬性的物件：
 *   - `stations` {Array|null} - 站點資料陣列，若尚未請求或發生錯誤則為 `null`
 *   - `isLoadingStations` {boolean} - 是否正在加載資料
 *   - `stationsError` {Error|null} - 若請求發生錯誤，將包含錯誤物件，否則為 `null`
 */
export function useStations() {
  const {
    data: stations,
    isLoading: isLoadingStations,
    error: stationsError,
  } = useQuery({
    queryKey: ["stations"],
    queryFn: apiGetStations,
  });

  return { stations, isLoadingStations, stationsError };
}
