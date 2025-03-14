export function getTimestamp() {
  return new Date().toISOString();
}

export function formatUTCTimestamp(utcTimestamp, timeZone = "Asia/Taipei") {
  const date = new Date(utcTimestamp);

  const options = {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  return new Intl.DateTimeFormat("zh-TW", options)
    .format(date)
    .replace(/\//g, "-")
    .replace(",", "");
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

// 計算可回收紙箱數量
export function countRecyclableBoxes(station) {
  const total = station.available_slots.XL + station.available_slots.L + station.available_slots.M + station.available_slots.S;
  return total;
};

// 計算可認領紙箱數量是否大於0
export function countPendingBoxes(station) {
  return station.boxes?.length;
};

// 取得電話號碼
export function formatPhoneNumber(phone) {
  return phone?.replace(/^\+886-/, "0").replace(/#$/, "");
};

// 計算營業時間
export function getTodayOpenTime(station_daily_hours){
  const today = new Date().getDay();
  let todayOpenTime = "";
  station_daily_hours.forEach((item, index) => {
    const openTime = item.open_time.replace(/^(\d{2}:\d{2}):\d{2}.*/, "$1");
    const closeTime = item.close_time.replace(/^(\d{2}:\d{2}):\d{2}.*/, "$1");

    if (today === index) {
      todayOpenTime = `${openTime}-${closeTime}`;
    }
  });

  return todayOpenTime;
};