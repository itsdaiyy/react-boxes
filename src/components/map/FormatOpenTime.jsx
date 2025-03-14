export default function FormatOpenTime(station_daily_hours) {
  return station_daily_hours.map((item, index) => {
    const openTime = item.open_time.replace(/^(\d{2}:\d{2}):\d{2}.*/, "$1");
    const closeTime = item.close_time.replace(/^(\d{2}:\d{2}):\d{2}.*/, "$1");

    if (index === 0) {
      return (
        <li key={index}>
          {item ? `星期日 ${openTime}-${closeTime}` : "休息"}
        </li>
      );
    } else if (index === 1) {
      return (
        <li key={index}>
          {item ? `星期一 ${openTime}-${closeTime}` : "休息"}
        </li>
      );
    } else if (index === 2) {
      return (
        <li key={index}>
          {item ? `星期二 ${openTime}-${closeTime}` : "休息"}
        </li>
      );
    } else if (index === 3) {
      return (
        <li key={index}>
          {item ? `星期三 ${openTime}-${closeTime}` : "休息"}
        </li>
      );
    } else if (index === 4) {
      return (
        <li key={index}>
          {item ? `星期四 ${openTime}-${closeTime}` : "休息"}
        </li>
      );
    } else if (index === 5) {
      return (
        <li key={index}>
          {item ? `星期五 ${openTime}-${closeTime}` : "休息"}
        </li>
      );
    } else {
      return (
        <li key={index}>
          {item ? `星期六 ${openTime}-${closeTime}` : "休息"}
        </li>
      );
    }
  });
};