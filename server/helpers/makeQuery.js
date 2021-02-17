// Accepts date string in format "YYYY-MM-DD" returns expression
// to use in match to find reservation checkIn date
const checkInDate = (checkInString) => {
  if (checkInString.length === 10) {
    return {
      $expr: {
        $eq: [
          checkInString,
          {
            $dateToString: {
              date: '$checkIn',
              format: '%Y-%m-%d'
            }
          }
        ]
      }
    };
  }
  return {};
};

// Accepts date string in format "YYYY-MM-DD" returns expression
// to use in match to find reservation checkOut date
const checkOutDate = (checkOutString) => {
  if (checkOutString.length === 10) {
    return {
      $expr: {
        $eq: [
          checkOutString,
          {
            $dateToString: {
              date: '$checkOut',
              format: '%Y-%m-%d'
            }
          }
        ]
      }
    };
  }
  return {};
};

const searchText = (...strings) => {
  let search = strings.join(' ').trim();
  if (search.length > 0) {
    return {
      $text: { $search: search}
    };
  }
  return {};
};

module.exports = {
  checkInDate,
  checkOutDate,
  searchText
};
