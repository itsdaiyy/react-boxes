import supabase from "./supabase";

/**
 * 從 Supabase 取得 5-5 紙箱交易紀錄的交易資料
 *
 * 該函式向 Supabase 的 `boxes` 表格請求 5-5 紙箱交易紀錄的交易資料，並處理錯誤。
 *
 * @async
 * @function apiGetTransactionRecords
 * @returns {Promise<Array>} 紙箱資料陣列，若請求成功返回資料，若失敗則會拋出錯誤
 * @throws {Error} 如果請求過程中發生錯誤，則會拋出錯誤
 */
export async function apiGetTransactionRecords(stationId) {
  try {
    let { data: records, error } = await supabase
      .from("box-transactions")
      .select("*")
      .eq("station_id", stationId);

    if (error) throw error;

    return records;
  } catch (error) {
    // supabase 錯誤內容
    console.error("讀取 box-transactions 發生錯誤:", error);
    // UI 顯示的錯誤內容
    throw new Error("無法取得 box-transactions 資料，請稍後再試");
  }
}
