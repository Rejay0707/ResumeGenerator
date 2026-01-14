// utils/dateUtils.js
export const formatDuration = (start, end) => {
  if (!start || !end) return "N/A";
  return `${start} → ${end}`;
};
