import {
  apiGetBoxesForSelling,
  apiGetBoxesForAdminManaging,
  apiGetBoxesForScraping,
  apiGetBoxesTotalForSelling,
  apiUpdateBox,
  apiUpdateMultipleBoxes,
  apiAddMultipleBoxes,
} from "@/services/apiBoxes";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
    data: boxes = [], // 若回傳null，表單搜尋功能會報錯
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
export function useBoxesForAdminManaging() {
  const queryClient = useQueryClient();
  const station = queryClient.getQueryData(["stationAdmin"]);
  const stationId = station?.id;

  const {
    data: boxes,
    isLoading: isLoadingBoxes,
    error: boxesError,
  } = useQuery({
    queryKey: ["boxes", "managing"],
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
export function useBoxesForScraping() {
  const queryClient = useQueryClient();
  const station = queryClient.getQueryData(["stationAdmin"]);
  const stationId = station?.id;

  const {
    data: boxes,
    isLoading: isLoadingBoxes,
    error: boxesError,
  } = useQuery({
    queryKey: ["boxes", "scrap"],
    queryFn: () => apiGetBoxesForScraping(stationId),
    enabled: !!stationId,
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
export function useBoxesTotalForSelling() {
  const queryClient = useQueryClient();
  const station = queryClient.getQueryData(["stationAdmin"]);
  const stationId = station?.id;
  const {
    data: boxes,
    isLoading: isLoadingBoxes,
    error: boxesError,
  } = useQuery({
    queryKey: ["boxes", "sale"],
    queryFn: () => apiGetBoxesTotalForSelling(stationId),
    enabled: !!stationId,
  });

  return { boxes, isLoadingBoxes, boxesError };
}

/**
 * 自訂 Hook：使用 React Query 來更新單一筆紙箱資料
 *
 * 使用 `useMutation` 來向 API 發送更新請求，並在成功時重新整理紙箱數據。
 *
 * @returns {Object} 返回包含四個屬性的物件：
 *   - `updateBox` {Function} - 用於觸發單筆更新的函式，接收 `{ boxId, values }`
 *   - `isUpdating` {boolean} - 是否正在更新資料
 *   - `updatedError` {Error|null} - 若請求發生錯誤，將包含錯誤物件，否則為 `null`
 *   - `isError` {boolean} - 是否發生錯誤
 */
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
      queryClient.invalidateQueries({ queryKey: ["boxes"] }); // 重新請求最新的紙箱列表
    },
    onError: (error) => {
      toast.error(`更新失敗: ${error.message}`);
    },
  });

  return { updateBox, isUpdating, updatedError, isError };
}

/**
 * 自訂 Hook：使用 React Query 來批量更新紙箱資料
 *
 * 使用 `useMutation` 來向 API 發送批量更新請求，並在成功時重新整理紙箱數據。
 *
 * @returns {Object} 返回包含四個屬性的物件：
 *   - `updateMultipleBoxes` {Function} - 用於觸發批量更新的函式，接收 `{ boxIds, values }`
 *   - `isUpdating` {boolean} - 是否正在更新資料
 *   - `updatedError` {Error|null} - 若請求發生錯誤，將包含錯誤物件，否則為 `null`
 *   - `isError` {boolean} - 是否發生錯誤
 */
export function useUpdateMultipleBoxes() {
  const queryClient = useQueryClient();

  const {
    mutate: updateMultipleBoxes,
    error: updatedError,
    isPending: isUpdating,
    isError,
  } = useMutation({
    mutationFn: ({ boxIds, values }) => apiUpdateMultipleBoxes(boxIds, values),
    onSuccess: () => {
      toast.success("售出成功");
      queryClient.invalidateQueries({ queryKey: ["boxes"] }); // 重新請求最新的紙箱列表
    },
    onError: (error) => {
      toast.error(`售出失敗: ${error.message}`);
    },
  });

  return { updateMultipleBoxes, isUpdating, updatedError, isError };
}

/**
 * 自訂 Hook：使用 React Query 來批量新增紙箱資料
 *
 * @returns {Object} 返回包含四個屬性的物件：
 *   - `addMultipleBoxes` {Function} - 用於觸發批量新增的函式，接收 `formData`
 *   - `isAdding` {boolean} - 是否正在新增資料
 *   - `addedError` {Error|null} - 若請求發生錯誤，將包含錯誤物件，否則為 `null`
 *   - `isError` {boolean} - 是否發生錯誤
 */
export function useAddMultipleBoxes() {
  const queryClient = useQueryClient();
  const station = queryClient.getQueryData(["stationAdmin"]);
  const stationId = station?.id;

  const {
    mutateAsync: addMultipleBoxesAsync,
    error: addedError,
    isPending: isAdding,
    isError,
  } = useMutation({
    mutationKey: ["addMultipleBoxes"],
    mutationFn: (formData) => apiAddMultipleBoxes({ formData, stationId }),
    onSuccess: () => {
      toast.success("紙箱新增成功");
      queryClient.invalidateQueries({ queryKey: ["boxes"] }); // 重新獲取最新數據
    },
    onError: (error) => {
      toast.error(`新增失敗: ${error.message}`);
    },
  });

  return { addMultipleBoxesAsync, isAdding, addedError, isError };
}
