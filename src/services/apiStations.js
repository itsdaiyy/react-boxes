import supabase from "./supabase";

/**
 * 從 Supabase 取得所有站點資料
 *
 * 該函式向 Supabase 的 `stations` 表格請求資料，並處理錯誤。
 *
 * @async
 * @function apiGetStations
 * @returns {Promise<Array>} 站點資料陣列，若請求成功返回資料，若失敗則會拋出錯誤
 * @throws {Error} 如果請求過程中發生錯誤，則會拋出錯誤
 */
export async function apiGetStations() {
  try {
    let { data: stations, error } = await supabase.from("stations").select("*");

    if (error) throw error;

    console.log(stations);

    return stations;
  } catch (error) {
    // supabase 錯誤內容
    console.error(error);
    // UI 顯示的錯誤內容
    throw new Error("無法取得 Stations 資料，請稍後再試");
  }
}

export async function apiGetStationById(stationId) {
  try {
    let { data: station, error } = await supabase
      .from("stations")
      .select("*")
      .eq("id", stationId)
      .single();
    if (error) throw error;

    console.log(station);

    return station;
  } catch (error) {
    console.error(error);
    throw new Error(`無法取得 Station - id: ${stationId}  資料，請稍後再試`);
  }
}
