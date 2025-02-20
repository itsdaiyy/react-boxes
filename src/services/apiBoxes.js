import supabase from "./supabase";
import { getTimestamp } from "@/utils/helpers";

/**
 * 從 Supabase 取得紙箱狀態為可認領的紙箱資料
 *
 * 該函式向 Supabase 的 `boxes` 表格請求紙箱狀態為可認領的資料，並處理錯誤。
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
      .in("status", ["可認領"]);

    if (error) throw error;

    return boxes;
  } catch (error) {
    // supabase 錯誤內容
    console.error("讀取 Box 發生錯誤:", error);
    // UI 顯示的錯誤內容
    throw new Error("無法取得 boxes 資料，請稍後再試");
  }
}

/**
 * 從 Supabase 取得 5-3 可認領紙箱列表的紙箱資料
 *
 * 該函式向 Supabase 的 `boxes` 表格請求 5-3 可認領紙箱列表的資料，並處理錯誤。
 *
 * @async
 * @function apiGetBoxesForAdminManaging
 * @returns {Promise<Array>} 紙箱資料陣列，若請求成功返回資料，若失敗則會拋出錯誤
 * @throws {Error} 如果請求過程中發生錯誤，則會拋出錯誤
 */
export async function apiGetBoxesForAdminManaging(stationId) {
  try {
    let { data: boxes, error } = await supabase
      .from("boxes")
      .select("*")
      .in("status", ["售出", "自用", "可認領"])
      .eq("station_id", stationId);

    if (error) throw error;

    return boxes;
  } catch (error) {
    // supabase 錯誤內容
    console.error("讀取 Box 發生錯誤:", error);
    // UI 顯示的錯誤內容
    throw new Error("無法取得 boxes 資料，請稍後再試");
  }
}

/**
 * 從 Supabase 取得 5-4 待回收紙箱列表的紙箱資料
 *
 * 該函式向 Supabase 的 `boxes` 表格請求 5-4 待回收紙箱列表的資料，並處理錯誤。
 *
 * @async
 * @function apiGetBoxesForScraping
 * @returns {Promise<Array>} 紙箱資料陣列，若請求成功返回資料，若失敗則會拋出錯誤
 * @throws {Error} 如果請求過程中發生錯誤，則會拋出錯誤
 */
export async function apiGetBoxesForScraping(stationId) {
  try {
    let { data: boxes, error } = await supabase
      .from("boxes")
      .select("*")
      .in("status", ["報廢", "保留到期"])
      .eq("station_id", stationId);

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
 * 從 Supabase 取得 5-2-3 待認領紙箱數量 的紙箱資料
 *
 * 該函式向 Supabase 的 `boxes` 表格請求 5-2-3 待認領紙箱數量的資料，並處理錯誤。
 *
 * @async
 * @function apiGetBoxesForScraping
 * @returns {Promise<Array>} 紙箱資料陣列，若請求成功返回資料，若失敗則會拋出錯誤
 * @throws {Error} 如果請求過程中發生錯誤，則會拋出錯誤
 */
export async function apiGetBoxesTotalForSelling(stationId) {
  try {
    let { data: boxes, error } = await supabase
      .from("boxes")
      .select("size")
      .in("status", ["可認領"])
      .eq("station_id", stationId);

    if (error) throw error;

    return boxes;
  } catch (error) {
    // supabase 錯誤內容
    console.error("讀取 Box 發生錯誤:", error);
    // UI 顯示的錯誤內容
    throw new Error("無法取得 boxes 資料，請稍後再試");
  }
}

/**
 * 從 Supabase 更新單一筆紙箱資料
 *
 * 該函式向 Supabase 的 `boxes` 表格更新單一筆的紙箱資料，並處理錯誤。
 *
 * @async
 * @function apiUpdateBox
 * @returns {Promise<Array>} 紙箱資料陣列，若請求成功返回資料，若失敗則會拋出錯誤
 * @throws {Error} 如果請求過程中發生錯誤，則會拋出錯誤
 */

export async function apiUpdateBox(boxId, values) {
  try {
    const { data: box, error } = await supabase
      .from("boxes")
      .update({ ...values, updated_at: getTimestamp() })
      .eq("id", boxId)
      .select();

    if (error) {
      console.error(error);
      throw error;
    }
    return box;
  } catch (error) {
    console.error(`更新 BoxID: ${boxId} 失敗:`, error);
    throw new Error("無法更新資料，請確認網路狀態或稍後再試");
  }
}
