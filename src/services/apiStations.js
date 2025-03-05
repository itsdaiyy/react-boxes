import { getTimestamp } from "@/utils/helpers";
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
    let { data: stations, error } = await supabase.from("stations").select(`*`);

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

export async function apiGetStationById(id, idName) {
  const idColumn = idName === "stationId" ? "id" : "user_id";
  try {
    let { data: station, error } = await supabase
      .from("stations")
      .select(
        `*,station_daily_hours(id, is_business_day, open_time, close_time, day_of_week, updated_at)`,
      )
      .order("day_of_week", {
        referencedTable: "station_daily_hours",
        ascending: true,
      })
      .eq(idColumn, id)
      .single();
    if (error) throw error;

    return station;
  } catch (error) {
    console.error(error);
    throw new Error(`無法取得 Station - ${idColumn}: ${id}  資料，請稍後再試`);
  }
}

// export async function getStationByMemberId(memberId) {
//   try {
//     let { data: station, error } = await supabase
//       .from("stations")
//       .select(
//         `*,station_daily_hours(id, is_business_day, open_time, close_time, day_of_week, updated_at)`,
//       )
//       .order("day_of_week", {
//         referencedTable: "station_daily_hours",
//         ascending: true,
//       })
//       .eq("user_id", memberId)
//       .single();
//     if (error) throw error;

//     return station;
//   } catch (error) {
//     console.error(error);
//     throw new Error(`無法取得 Station - id: ${stationId}  資料，請稍後再試`);
//   }
// }

// StationInfo  更新站點資訊格式：
// {
//   id: 1,   // station id
//   station_name: "多米葉漢堡",
//   address: "新北市樹林區佳園路2段104號",
//   phone: "+886-2-26802008",
//   station_daily_hours: [
//     {
//       id: 70,
//       open_time: "08:00:00+00",
//       close_time: "20:00:00+00",
//       day_of_week: 6,
//       is_business_day: true,
//     },
//   ],
// }

export async function apiUpdateStationInfo({
  id,
  station_name,
  phone,
  address,
  station_daily_hours,
}) {
  const updatedInfo = {
    station_name,
    phone,
    address,
    updated_at: getTimestamp(),
  };

  // 更新基本資訊
  try {
    const { data: station, error } = await supabase
      .from("stations")
      .update(updatedInfo)
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
//  {
//     id: 70,
//     open_time: "08:00:00+00",
//     close_time: "20:00:00+00",
//     day_of_week: 6,
//     is_business_day: false,
//  }
// ];
export async function updateStationHours(hoursData) {
  const missingId = hoursData.find((el) => !el.id);

  if (missingId) {
    return { error: new Error(`更新站點營業時間時，每筆記錄都必須包含 id`) };
  }

  const updatedHoursData = hoursData.map((el) => ({
    ...el,
    updated_at: getTimestamp(),
  }));

  const { data, error } = await supabase
    .from("station_daily_hours")
    .upsert(updatedHoursData, {
      onConflict: "id",
    })
    .select();

  return { data, error };
}

export async function apiUpdateAvailableSlots({ stationId, S, M, L, XL }) {
  try {
    const { data, error } = await supabase
      .from("stations")
      .update({
        available_slots: { S, M, L, XL },
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
