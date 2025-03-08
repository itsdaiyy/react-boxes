import { getTimestamp } from "@/utils/helpers";
import supabase from "./supabase";
import supabaseAdmin from "./supabaseAdmin";

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

export async function apiCreateTransaction({
  transaction,
  stationInfo,
  memberId,
}) {
  console.log(transaction, stationInfo, memberId);
  let total_points;
  let user_name_snapshot;
  try {
    if (memberId) {
      const { data, userError } =
        await supabaseAdmin.auth.admin.getUserById(memberId);

      const { data: records, error } = await supabase
        .from("box-transactions")
        .select("*")
        .eq("user_id", memberId)
        .order("created_at", { ascending: false }) // 🔹 依 `created_at` 降序排列
        .limit(1); // 🔹 只取最新一筆

      if (userError || error) {
        console.error(userError || error);
        throw new Error(`無法取該用戶，ID： ${memberId}`);
      }

      const recordsData = records.length > 0 ? records[0] : null;

      console.log(transaction.earned_points - transaction.points_cost);
      console.log(recordsData);

      total_points = recordsData
        ? recordsData.total_points +
          transaction.earned_points -
          transaction.points_cost
        : 0 + transaction.earned_points - transaction.points_cost;
      user_name_snapshot = data.user.user_metadata.display_name;
    }

    const newTransaction = {
      ...transaction,
      ...stationInfo,
      boxes: [...transaction.boxes],

      total_points: total_points ? total_points : 0,
      user_id: memberId,
      user_name_snapshot: user_name_snapshot ? user_name_snapshot : null,
      created_at: getTimestamp(),
    };

    console.log(newTransaction);

    const { data: transactionData, error } = await supabase
      .from("box-transactions")
      .insert([newTransaction])
      .select()
      .single();

    if (error) throw error;

    console.log("transactionData", transactionData);

    if (total_points) {
      const { data: user, error } =
        await supabaseAdmin.auth.admin.updateUserById(memberId, {
          user_metadata: { points: total_points },
        });
      if (error) {
        console.error(error);

        const { error } = await supabase
          .from("box-transactions")
          .delete()
          .eq("id", transactionData.id);

        throw new Error("更新用戶點數失敗");
      }
      console.log(user);
    }

    console.log("final data", transactionData);

    return transactionData;
  } catch (error) {
    throw new Error(error.message);
  }
}
