const sortFilms = (key, Movies) => {
  let sorted = [...Movies];
  switch (key) {
    case 'bestRating': {
      sorted.sort(compareByRating);
      break;
    }
    case 'worstRating': {
      sorted.sort((a, b) => compareByRating(b, a));
      break;
    }
    case 'mostPopular': {
      sorted.sort(compareByRatingCount);
      break;
    }
    case 'leastPopular': {
      sorted.sort((a, b) => compareByRatingCount(b, a));
      break;
    }
    default:
      break;
  }
  return sorted;
};

const compareByRating = (a, b) => {
  if (!a.ratingValue) return 1;
  if (!b.ratingValue) return -1;
  return parseFloat(b.ratingValue) - parseFloat(a.ratingValue);
};

const compareByRatingCount = (a, b) => {
  if (!a.ratingValue) return 1;
  if (!b.ratingValue) return -1;
  return parseFloat(b.ratingCount.replace(/,/g, '')) - parseFloat(a.ratingCount.replace(/,/g, ''));
};

export default sortFilms;
