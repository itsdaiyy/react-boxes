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
    let { data: stations, error } = await supabase
      .from("stations")
      .select(`*, boxes(*)`)
      .eq("boxes.status", "可認領");

    if (error) throw error;

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
  let getStationError;
  let station;

  try {
    if (idName === "stationId") {
      let { data, error } = await supabase
        .from("stations")
        .select(
          `*,station_daily_hours(id, is_business_day, open_time, close_time, day_of_week, updated_at),boxes(*)`,
        )
        .order("day_of_week", {
          referencedTable: "station_daily_hours",
          ascending: true,
        })
        .eq(idColumn, id)
        .single()
        .eq("boxes.status", "可認領");

      if (error) getStationError = error;
      station = data;
    }

    if (idName === "userId") {
      let { data, error } = await supabase
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

      if (error) getStationError = error;
      station = data;
    }

    if (getStationError) throw getStationError;

    return station;
  } catch (error) {
    console.error(error);
    throw new Error(`無法取得 Station - ${idColumn}: ${id}  資料，請稍後再試`);
  }
}

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
      const { newDailyHours, error } =
        await updateStationHours(station_daily_hours);

      if (error) throw error;

      updatedHours = newDailyHours;
    }

    return { ...station, station_daily_hours: updatedHours };
  } catch (error) {
    console.error(error);
    throw new Error(`無法更新 Station 資訊，請稍後再試`);
  }
}

export async function updateStationHours(dailyHoursData) {
  const missingId = dailyHoursData.find((el) => !el.id);

  if (missingId) {
    return { error: new Error(`更新站點營業時間時，每筆記錄都必須包含 id`) };
  }

  const newDailyHours = [];

  for (const dailyHours of dailyHoursData) {
    const { open_time, close_time, is_business_day, id } = dailyHours;
    const { data, error } = await supabase
      .from("station_daily_hours")
      .update({
        open_time,
        close_time,
        is_business_day,
        updated_at: getTimestamp(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) return { error };
    newDailyHours.push(data);
  }
  return { newDailyHours };
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
