import supabase from "./supabase";

/**
 * 從 Supabase 取得所有紙箱資料
 *
 * 該函式向 Supabase 的 `boxes` 表格請求可認領紙箱列表的資料，並處理錯誤。
 *
 * @async
 * @function apiGetBoxesForSelling
 * @returns {Promise<Array>} 紙箱資料陣列，若請求成功返回資料，若失敗則會拋出錯誤
 * @throws {Error} 如果請求過程中發生錯誤，則會拋出錯誤
 */
export async function apiGetBoxesForSelling() {
  try {
    let { data: boxes, error } = await supabase
      .from("boxes")
      .select("*")
      .in("status", ["售出", "自用", "可認領"]);

    if (error) throw error;

    return boxes;
  } catch (error) {
    // supabase 錯誤內容
    console.error(error);
    // UI 顯示的錯誤內容
    throw new Error("無法取得 boxes 資料，請稍後再試");
  }
}

/**
 * 從 Supabase 取得所有紙箱資料
 *
 * 該函式向 Supabase 的 `boxes` 表格請求待回收紙箱列表的資料，並處理錯誤。
 *
 * @async
 * @function apiGetBoxesForScraping
 * @returns {Promise<Array>} 紙箱資料陣列，若請求成功返回資料，若失敗則會拋出錯誤
 * @throws {Error} 如果請求過程中發生錯誤，則會拋出錯誤
 */
export async function apiGetBoxesForScraping() {
  try {
    let { data: boxes, error } = await supabase
      .from("boxes")
      .select("*")
      .in("status", ["報廢", "保留到期"]);

    if (error) throw error;

    return boxes;
  } catch (error) {
    // supabase 錯誤內容
    console.error(error);
    // UI 顯示的錯誤內容
    throw new Error("無法取得 boxes 資料，請稍後再試");
  }
}
