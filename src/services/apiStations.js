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
    let { data: stations, error } = await supabase
      .from("stations")
      .select(`id, station_name, latitude, longitude`);

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
      .select(`*,station_daily_hours(id,open_time,close_time,day_of_week)`)
      .eq("id", stationId)
      .single();
    if (error) throw error;

    return station;
  } catch (error) {
    console.error(error);
    throw new Error(`無法取得 Station - id: ${stationId}  資料，請稍後再試`);
  }
}

// StationInfo 更新物件格式：
// {
//   id: 2,    // station_id
//   address: "新北市三重區大同南路152號1樓",
//   phone: "+886-2-2975970",
//   station_daily_hours: [
//     {
//       id: 3,   //station_daily_hours id
//       open_time: `05:00:00+00`,
//       close_time: `21:00:00+00`,
//       updated_at: getTimestamp(),
//     },
//   ],
// }
export async function apiUpdateStationInfo(newData) {
  const { id, phone, address, station_daily_hours } = newData;

  const infoObj = { phone, address };

  // 更新基本資訊
  try {
    const { data: station, error } = await supabase
      .from("stations")
      .update(infoObj)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    // 更新營業時間
    let updatedHours = [];
    if (station_daily_hours.length > 0 && Array.isArray(station_daily_hours)) {
      updatedHours = await updateStationHours(station_daily_hours);
    }

    return { ...station, station_daily_hours: updatedHours };
  } catch (error) {
    console.error(error);
    throw new Error(`無法更新 Station 資訊，請稍後再試`);
  }
}

// Station Hours 更新物件格式：
// [
//   {
//     id: 3,
//     open_time: `05:00:00+00`,
//     close_time: `21:00:00+00`,
//     updated_at: getTimestamp(),
//   },
// ];
export async function updateStationHours(hoursData) {
  try {
    const { data, error } = await supabase
      .from("station_daily_hours")
      .upsert(hoursData, {
        onConflict: "id",
        ignoreDuplicates: false,
      })
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`無法更新營業時間，請稍後再試`);
  }
}
