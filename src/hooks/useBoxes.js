import {
  apiGetBoxesForSelling,
  apiGetBoxesForAdminManaging,
  apiGetBoxesForScraping,
} from "@/services/apiBoxes";
import { useQuery } from "@tanstack/react-query";
/**
 * 自訂 Hook：使用 React Query 來取得紙箱資料
 *
 * 使用 `useQuery` 來向 API 請求紙箱資料，並處理資料加載與錯誤狀態。
 *
 * @returns {Object} 返回包含三個屬性的物件：
 *   - `boxes` {Array|null} - 紙箱資料陣列，若尚未請求或發生錯誤則為 `null`
 *   - `isLoadingBoxes` {boolean} - 是否正在加載資料
 *   - `BoxesError` {Error|null} - 若請求發生錯誤，將包含錯誤物件，否則為 `null`
 */
export function useBoxesForSelling() {
  const {
    data: boxes,
    isLoading: isLoadingBoxes,
    error: boxesError,
  } = useQuery({
    queryKey: ["boxes", "selling"],
    queryFn: apiGetBoxesForSelling,
  });

  return { boxes, isLoadingBoxes, boxesError };
}
/**
 * 自訂 Hook：使用 React Query 來取得紙箱資料
 *
 * 使用 `useQuery` 來向 API 請求紙箱資料，並處理資料加載與錯誤狀態。
 *
 * @returns {Object} 返回包含三個屬性的物件：
 *   - `boxes` {Array|null} - 紙箱資料陣列，若尚未請求或發生錯誤則為 `null`
 *   - `isLoadingBoxes` {boolean} - 是否正在加載資料
 *   - `BoxesError` {Error|null} - 若請求發生錯誤，將包含錯誤物件，否則為 `null`
 */
export function useBoxesForAdminManaging() {
  const {
    data: boxes,
    isLoading: isLoadingBoxes,
    error: boxesError,
  } = useQuery({
    queryKey: ["boxes", "managing"],
    queryFn: apiGetBoxesForAdminManaging,
  });

  return { boxes, isLoadingBoxes, boxesError };
}

/**
 * 自訂 Hook：使用 React Query 來取得紙箱資料
 *
 * 使用 `useQuery` 來向 API 請求紙箱資料，並處理資料加載與錯誤狀態。
 *
 * @returns {Object} 返回包含三個屬性的物件：
 *   - `boxes` {Array|null} - 紙箱資料陣列，若尚未請求或發生錯誤則為 `null`
 *   - `isLoadingBoxes` {boolean} - 是否正在加載資料
 *   - `BoxesError` {Error|null} - 若請求發生錯誤，將包含錯誤物件，否則為 `null`
 */
export function useBoxesForScraping() {
  const {
    data: boxes,
    isLoading: isLoadingBoxes,
    error: boxesError,
  } = useQuery({
    queryKey: ["boxes", "scrap"],
    queryFn: apiGetBoxesForScraping,
  });

  return { boxes, isLoadingBoxes, boxesError };
}
