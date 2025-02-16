export function getTimestamp() {
  const now = new Date();

  // 取得 ISO 格式：2025-02-02T07:36:28.117Z
  let isoString = now.toISOString();

  return isoString;
}
