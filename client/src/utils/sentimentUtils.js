// Maps rating 1-5 to a simple badge label
export const getSentiment = (rating) => {
  const num = Number(rating);
  if (num === 5) return { label: 'Excellent', emoji: '⭐ 5/5', className: 'badge-success' };
  if (num === 4) return { label: 'Good', emoji: '⭐ 4/5', className: 'badge-info' };
  if (num === 3) return { label: 'Average', emoji: '⭐ 3/5', className: 'badge-warning' };
  return { label: 'Poor', emoji: '⭐ ' + num + '/5', className: 'badge-danger' };
};

// Simple helper to get initials from name (e.g. "Yash Garg" -> "YG")
export const getInitials = (name) => {
  if (!name) return 'U';
  const words = name.trim().split(' ');
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};
