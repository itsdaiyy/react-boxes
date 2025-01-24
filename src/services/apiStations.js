import supabase from "./supabase";

export async function apiGetStations() {
  try {
    let { data: stations, error } = await supabase.from("stations").select("*");

    if (error) throw error;

    return stations;
  } catch (error) {
    console.error(error);
  }
}
