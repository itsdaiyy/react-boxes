export function getTimestamp() {
  const now = new Date();

  // 取得 ISO 格式：2025-02-02T07:36:28.117Z
  let isoString = now.toISOString();

  return isoString;
}

/**
 * 計算保存到期日
 * @param {string} updateTime - 更新時間 (格式: "YYYY-MM-DDTHH:MM:SS.sss+00:00")
 * @param {number} retentionDays - 保存天數
 * @returns {string} 格式化的保存到期日 (yyyy-mm-dd HH:MM)
 */
export function getExpirationDate(updateTime, retentionDays) {
  // 解析 ISO 8601 格式的日期（自動處理時區）
  const updateDate = new Date(updateTime);

  // 加上保存天數
  updateDate.setDate(updateDate.getDate() + retentionDays);

  const year = updateDate.getFullYear();
  const month = String(updateDate.getMonth() + 1).padStart(2, "0");
  const day = String(updateDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/**
 * 判斷保存到期日是否已過期
 * @param {string} expirationDate - 保存到期日 (格式: "YYYY-MM-DD HH:MM")
 * @returns {boolean} 若到期日大於當前時間，則返回 false，否則返回 true (已過期)
 */
export function isExpired(expirationDate) {
  const expDate = new Date(expirationDate.replace(" ", "T"));
  const currentDate = new Date();
  return expDate <= currentDate;
}

export function getPendingBoxes(boxes = []) {
  const countsObj = {};
  for (const box of boxes) {
    if (countsObj[box.size] === undefined) {
      countsObj[box.size] = 1;
    } else {
      countsObj[box.size] += 1;
    }
  }
  return countsObj;
}
