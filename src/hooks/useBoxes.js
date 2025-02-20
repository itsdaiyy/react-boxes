import {
  apiGetBoxesForSelling,
  apiGetBoxesForAdminManaging,
  apiGetBoxesForScraping,
  apiGetBoxesTotalForSelling,
} from "@/services/apiBoxes";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiUpdateBox } from "@/services/apiBoxes";
/**
 * 自訂 Hook：使用 React Query 來取得紙箱狀態為可認領的紙箱資料
 *
 * 使用 `useQuery` 來向 API 請求紙箱狀態為可認領的紙箱資料，並處理資料加載與錯誤狀態。
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
 * 自訂 Hook：使用 React Query 來取得 5-3 可認領紙箱列表的紙箱資料
 *
 * 使用 `useQuery` 來向 API 請求 5-3 可認領紙箱列表的紙箱資料，並處理資料加載與錯誤狀態。
 *
 * @returns {Object} 返回包含三個屬性的物件：
 *   - `boxes` {Array|null} - 紙箱資料陣列，若尚未請求或發生錯誤則為 `null`
 *   - `isLoadingBoxes` {boolean} - 是否正在加載資料
 *   - `BoxesError` {Error|null} - 若請求發生錯誤，將包含錯誤物件，否則為 `null`
 */
export function useBoxesForAdminManaging(stationId) {
  const {
    data: boxes,
    isLoading: isLoadingBoxes,
    error: boxesError,
  } = useQuery({
    queryKey: ["boxes", "managing", stationId],
    queryFn: () => apiGetBoxesForAdminManaging(stationId),
  });

  return { boxes, isLoadingBoxes, boxesError };
}

/**
 * 自訂 Hook：使用 React Query 來取得 5-4 待回收紙箱列表的紙箱資料
 *
 * 使用 `useQuery` 來向 API 請求 5-4 待回收紙箱列表的紙箱資料，並處理資料加載與錯誤狀態。
 *
 * @returns {Object} 返回包含三個屬性的物件：
 *   - `boxes` {Array|null} - 紙箱資料陣列，若尚未請求或發生錯誤則為 `null`
 *   - `isLoadingBoxes` {boolean} - 是否正在加載資料
 *   - `BoxesError` {Error|null} - 若請求發生錯誤，將包含錯誤物件，否則為 `null`
 */
export function useBoxesForScraping(stationId) {
  const {
    data: boxes,
    isLoading: isLoadingBoxes,
    error: boxesError,
  } = useQuery({
    queryKey: ["boxes", "scrap", stationId],
    queryFn: () => apiGetBoxesForScraping(stationId),
  });

  return { boxes, isLoadingBoxes, boxesError };
}
/**
 * 自訂 Hook：使用 React Query 來取得 5-2-3 待認領紙箱數量的紙箱資料
 *
 * 使用 `useQuery` 來向 API 請求 5-2-3 待認領紙箱數量的紙箱資料，並處理資料加載與錯誤狀態。
 *
 * @returns {Object} 返回包含三個屬性的物件：
 *   - `boxes` {Array|null} - 紙箱資料陣列，若尚未請求或發生錯誤則為 `null`
 *   - `isLoadingBoxes` {boolean} - 是否正在加載資料
 *   - `BoxesError` {Error|null} - 若請求發生錯誤，將包含錯誤物件，否則為 `null`
 */
export function useBoxesTotalForSelling(stationId) {
  const {
    data: boxes,
    isLoading: isLoadingBoxes,
    error: boxesError,
  } = useQuery({
    queryKey: ["boxes", stationId],
    queryFn: () => apiGetBoxesTotalForSelling(stationId),
  });

  return { boxes, isLoadingBoxes, boxesError };
}

// 更新單一筆紙箱資料
export function useUpdateBox() {
  const queryClient = useQueryClient();
  const {
    mutate: updateBox,
    error: updatedError,
    isPending: isUpdating,
    isError,
  } = useMutation({
    mutationFn: ({ boxId, values }) => apiUpdateBox(boxId, values),
    onSuccess: () => {
      toast.success("更新成功");
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateBox, updatedError, isUpdating, isError };
}
