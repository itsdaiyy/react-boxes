import supabase from "./supabase";

/**
 * 從 Supabase 取得 管理者-紙箱交易紀錄的交易資料
 *
 * 該函式向 Supabase 的 `boxes` 表格請求 管理者-紙箱交易紀錄的交易資料，並處理錯誤。
 *
 * @async
 * @function apiGetAdminTransactionRecords
 * @returns {Promise<Array>} 紙箱資料陣列，若請求成功返回資料，若失敗則會拋出錯誤
 * @throws {Error} 如果請求過程中發生錯誤，則會拋出錯誤
 */
export async function apiGetAdminTransactionRecords(stationId) {
  try {
    let { data: records, error } = await supabase
      .from("box-transactions")
      .select("*")
      .eq("station_id", stationId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return records;
  } catch (error) {
    // supabase 錯誤內容
    console.error("讀取 box-transactions 發生錯誤:", error);
    // UI 顯示的錯誤內容
    throw new Error("無法取得 box-transactions 資料，請稍後再試");
  }
}

/**
 * 從 Supabase 取得 一般會員-紙箱交易紀錄的交易資料
 *
 * 該函式向 Supabase 的 `boxes` 表格請求 一般會員-紙箱交易紀錄的交易資料，並處理錯誤。
 *
 * @async
 * @function apiGetMemberTransactionRecords
 * @returns {Promise<Array>} 紙箱資料陣列，若請求成功返回資料，若失敗則會拋出錯誤
 * @throws {Error} 如果請求過程中發生錯誤，則會拋出錯誤
 */
export async function apiGetMemberTransactionRecords(userId) {
  try {
    let { data: records, error } = await supabase
      .from("box-transactions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return records;
  } catch (error) {
    // supabase 錯誤內容
    console.error("讀取 box-transactions 發生錯誤:", error);
    // UI 顯示的錯誤內容
    throw new Error("無法取得 box-transactions 資料，請稍後再試");
  }
}

export async function apiGetTransactionsCounts(userId) {
  try {
    // 交易次數
    let { data: boxTransactions, error } = await supabase
      .from("box-transactions")
      .select("id, user_id")
      .eq("user_id", userId);

    if (error) throw error;

    const transactionsCounts = boxTransactions.length;
    return transactionsCounts;
  } catch (error) {
    throw new Error(error.message);
  }
}
