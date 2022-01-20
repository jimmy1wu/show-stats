export const getColorFromRating = (imdbRating: number) => {
  let textColor;
  if (imdbRating === 0) {
    textColor = "text-gray-700";
  } else if (imdbRating < 5) {
    textColor = "text-red-600";
  } else if (imdbRating < 7.5) {
    textColor = "text-yellow-400";
  } else {
    textColor = "text-green-600";
  }

  return textColor;
};
