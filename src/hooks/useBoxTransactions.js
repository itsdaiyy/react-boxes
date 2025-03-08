import {
  apiGetAdminTransactionRecords,
  apiGetMemberTransactionRecords,
} from "@/services/apiBoxTransactions";
import { useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * 自訂 Hook：使用 React Query 來取得 管理者-紙箱交易紀錄的交易資料
 *
 * 使用 `useQuery` 來向 API 請求 管理者-紙箱交易紀錄的交易資料，並處理資料加載與錯誤狀態。
 *
 * @returns {Object} 返回包含三個屬性的物件：
 *   - `boxes` {Array|null} - 紙箱資料陣列，若尚未請求或發生錯誤則為 `null`
 *   - `isLoadingBoxes` {boolean} - 是否正在加載資料
 *   - `BoxesError` {Error|null} - 若請求發生錯誤，將包含錯誤物件，否則為 `null`
 */
export function useAdminTransactionRecords() {
  const queryClient = useQueryClient();
  const currentStation = queryClient.getQueryData(["stationAdmin"]);
  const stationId = currentStation?.id;

  const {
    data: records,
    isLoading: isLoadingRecords,
    error: recordsError,
  } = useQuery({
    queryKey: ["boxes-transactions", "admin"],
    queryFn: () => apiGetAdminTransactionRecords(stationId),
    enabled: !!stationId,
  });

  return { records, isLoadingRecords, recordsError };
}

/**
 * 自訂 Hook：使用 React Query 來取得 一般會員-紙箱交易紀錄的交易資料
 *
 * 使用 `useQuery` 來向 API 請求 一般會員-紙箱交易紀錄的交易資料，並處理資料加載與錯誤狀態。
 *
 * @returns {Object} 返回包含三個屬性的物件：
 *   - `boxes` {Array|null} - 紙箱資料陣列，若尚未請求或發生錯誤則為 `null`
 *   - `isLoadingBoxes` {boolean} - 是否正在加載資料
 *   - `BoxesError` {Error|null} - 若請求發生錯誤，將包含錯誤物件，否則為 `null`
 */
export function useMemberTransactionRecords() {
  const queryClient = useQueryClient();
  const currentMember = queryClient.getQueryData(["member"]);
  const memberId = currentMember?.user?.id;

  const {
    data: records,
    isLoading: isLoadingRecords,
    error: recordsError,
  } = useQuery({
    queryKey: ["boxes-transactions", "normal"],
    queryFn: () => apiGetMemberTransactionRecords(memberId),
    enabled: !!memberId,
  });

  return { records, isLoadingRecords, recordsError };
}
