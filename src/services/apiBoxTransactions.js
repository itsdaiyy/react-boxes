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

// {
//     "userId": "8b9acdef-b856-4c78-ac16-36d199737957",
//     "selectedRows": [
//         {
//             "id": 152,
//             "created_at": "2024-01-30T00:00:00+00:00",
//             "updated_at": "2024-11-25T00:00:00+00:00",
//             "size": "特大",
//             "condition": "全新",
//             "status": "可認領",
//             "retention_days": 30,
//             "image_url": "https://fakeimg.pl/300/",
//             "cash_value": 20,
//             "point_value": 9,
//             "station_id": 1,
//             "user_id": "1725f7bc-7108-4d31-ae2f-b3d68393d6a5"
//         },
//         {
//             "id": 29,
//             "created_at": "2024-05-15T00:00:00+00:00",
//             "updated_at": "2024-11-14T00:00:00+00:00",
//             "size": "小",
//             "condition": "全新",
//             "status": "可認領",
//             "retention_days": 30,
//             "image_url": "https://fakeimg.pl/300/",
//             "cash_value": 8,
//             "point_value": 6,
//             "station_id": 1,
//             "user_id": "8b9acdef-b856-4c78-ac16-36d199737957"
//         }
//     ],
//     "paymentMethod": "cash"
// }

//  {
//     id: 192,
//     created_at: "2025-01-29T00:00:00+00:00",
//     transaction_type: "回收",
//     cash_cost: 0,
//     points_cost: 0,
//     earned_points: 3,
//     total_points: 17,
//     station_id: 7,
//     station_name_snapshot: "無日",
//     user_id: "34cdab41-2bdf-4dd9-8c35-0cb7c15a4d0b",
//     user_name_snapshot: "阮彥博",
//     status: "成功",
//     boxes: [
//       {
//         size: "大",
//         box_id: 99,
//         condition: "差",
//         cash_value: 4,
//         point_value: 3,
//       },
//     ],
//   };

// {
//     "transaction_type": "認領",
//     "cash_cost": 28,
//     "points_cost": 0,
//     "earned_points": 2,
//     "boxes": [
//         {
//             "size": "特大",
//             "box_id": 152,
//             "condition": "全新",
//             "cash_value": 20,
//             "point_value": 9
//         },
//         {
//             "size": "小",
//             "box_id": 29,
//             "condition": "全新",
//             "cash_value": 8,
//             "point_value": 6
//         }
//     ]
// }
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
      const { data, error } =
        await supabaseAdmin.auth.admin.getUserById(memberId);

      if (error) {
        console.error(error);
        throw new Error(`無法取該用戶，ID： ${memberId}`);
      }
      total_points =
        data.user.user_metadata.points +
        transaction.earned_points -
        transaction.points_cost;
      user_name_snapshot = data.user.user_metadata.display_name;
    }

    console.log(user_name_snapshot, total_points);

    const newTransaction = {
      ...transaction,
      ...stationInfo,
      boxes: [...transaction.boxes],

      total_points: total_points ? total_points : null,
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
