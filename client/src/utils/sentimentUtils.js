/**
 * Maps a numeric star rating (1-5) to a sentiment label, emoji, and CSS modifier
 * @param {number} rating - Star rating between 1 and 5
 * @returns {{ label: string, emoji: string, className: string }}
 */
export const getSentiment = (rating) => {
  const num = Number(rating) || 5;
  if (num >= 5) {
    return { label: 'Excellent', emoji: '🤩', className: 'sentiment-excellent' };
  }
  if (num === 4) {
    return { label: 'Good', emoji: '😊', className: 'sentiment-good' };
  }
  if (num === 3) {
    return { label: 'Neutral', emoji: '😐', className: 'sentiment-neutral' };
  }
  return { label: 'Bad', emoji: '😡', className: 'sentiment-bad' };
};

/**
 * Extracts uppercase initials from a user name
 * @param {string} name - Full name
 * @returns {string} 1 or 2 letter initials (e.g. "Rahul Sharma" -> "RS")
 */
export const getInitials = (name) => {
  if (!name || typeof name !== 'string') return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};
