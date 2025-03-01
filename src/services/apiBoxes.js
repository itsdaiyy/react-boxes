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
 * @function apiGetBoxesTotalForSelling
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

/**
 * 從 Supabase 更新多筆紙箱資料
 *
 * 該函式向 Supabase 的 `boxes` 表格更新多筆紙箱資料，並處理錯誤。
 *
 * @async
 * @function apiUpdateMultipleBoxes
 * @param {Array<number>} boxIds - 需要更新的紙箱 ID 陣列
 * @param {Object} values - 需要更新的欄位值
 * @returns {Promise<Array>} 紙箱資料陣列，若請求成功返回資料，若失敗則會拋出錯誤
 * @throws {Error} 如果請求過程中發生錯誤，則會拋出錯誤
 */

export async function apiUpdateMultipleBoxes(boxIds, values) {
  try {
    // 確保 boxIds 是有效的陣列
    if (!Array.isArray(boxIds) || boxIds.length === 0) {
      throw new Error("無效的輸入，請提供需要更新的紙箱 ID 陣列");
    }

    // 使用 `.in()` 來批量更新符合條件的紙箱
    const { data: updatedBoxes, error } = await supabase
      .from("boxes")
      .update({ ...values, updated_at: getTimestamp() })
      .in("id", boxIds) // 更新所有符合 boxIds 陣列內的資料
      .select();

    if (error) {
      console.error("批量更新失敗:", error);
      throw error;
    }

    return updatedBoxes;
  } catch (error) {
    console.error("批量更新紙箱資料失敗:", error);
    throw new Error("無法更新資料，請確認網路狀態或稍後再試");
  }
}

/**
 * 向 Supabase 新增多筆紙箱資料。
 *
 * @param {Object} formData - 前端表單提交的資料
 * @param {string} formData.userId - 提交者的用戶 ID
 * @param {Array} formData.boxes - 需要新增的紙箱資料陣列
 * @returns {Promise<Array>} 新增的紙箱資料或錯誤
 */
export async function apiAddMultipleBoxes(formData) {
  try {
    // 格式化數據以符合 Supabase 的表格格式
    const formattedBoxes = formData.boxes.map((box) => ({
      created_at: getTimestamp(), // 設定當前時間
      updated_at: getTimestamp(), // 預設與 `created_at` 相同
      size: box.size,
      condition: box.condition,
      status: "可認領", // 預設狀態
      image_url: "https://fakeimg.pl/300/", // 預設圖片
      cash_value: Number(box.cash_value), // 確保為數字
      point_value: Number(box.points), // 確保為數字
      retention_days: Number(box.retention_days) || 0, // 轉換為數字
      station_id: formData.station_id, // 站點 ID
      user_id: formData.userId, // 來自前端的 userId
    }));

    // 批量插入數據
    const { data: addBoxes, error } = await supabase
      .from("boxes")
      .insert(formattedBoxes)
      .select();

    if (error) {
      console.error("批量新增失敗:", error);
      throw error;
    }

    return addBoxes;
  } catch (error) {
    console.error("批量新增紙箱資料失敗:", error.message);
    throw new Error("無法新增資料，請確認網路狀態或稍後再試");
  }
}
