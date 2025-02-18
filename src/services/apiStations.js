import supabase from "./supabase";

/**
 * 從 Supabase 取得所有站點資料
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
      .select(
        `*,station_daily_hours(id, open_time, close_time, day_of_week, updated_at)`,
      )
      .order("day_of_week", {
        referencedTable: "station_daily_hours",
        ascending: true,
      })
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
//       id: 3,   // 需要傳入時間 id
//       open_time: `05:00:00+00`,
//       close_time: `21:00:00+00`,
//       updated_at: getTimestamp(),
//     },
//   ],
// }
export async function apiUpdateStationInfo(newData) {
  const { id, phone, address, station_daily_hours, updated_at } = newData;

  const infoObj = { phone, address, updated_at };

  // 更新基本資訊3
  try {
    const { data: station, error } = await supabase
      .from("stations")
      .update(infoObj)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    let updatedHours = [];

    // 更新營業時間（如果有提供）
    if (Array.isArray(station_daily_hours) && station_daily_hours.length > 0) {
      const { data, error } = await updateStationHours(station_daily_hours);

      if (error) {
        console.log(error);
        throw error;
      }
      updatedHours = data;
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
//     id: 3,   // 需要傳入時間 id
//     open_time: `05:00:00+00`,
//     close_time: `21:00:00+00`,
//     updated_at: getTimestamp(),
//   },
// ];
export async function updateStationHours(hoursData) {
  const missingId = hoursData.find((el) => !el.id);

  if (missingId) {
    return { error: new Error(`更新站點營業時間時，每筆記錄都必須包含 id`) };
  }

  const { data, error } = await supabase
    .from("station_daily_hours")
    .upsert(hoursData, {
      onConflict: "id",
    })
    .select();

  return { data, error };
}

export async function apiUpdateRecyclableBoxes({
  stationId,
  xlCounts,
  lCounts,
  mCounts,
  sCounts,
}) {
  console.log({ stationId, xlCounts, lCounts, mCounts, sCounts });
  try {
    const { data, error } = await supabase
      .from("stations")
      .update({
        available_slots: { L: lCounts, M: mCounts, S: sCounts, XL: xlCounts },
      })
      .eq("id", stationId)
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
