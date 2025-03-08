export function formatRelativeTime(data: Date) {
  const now = new Date();
  let diffInDays = Math.floor(
    (now.getTime() - new Date(data).getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays < 0) diffInDays = 0; // Prevents negative values

  if (diffInDays === 0) {
    return "Posted Today";
  } else if (diffInDays === 1) {
    return "Posted 1 day ago";
  } else {
    return `Posted ${diffInDays} days ago`;
  }
}
