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

// returns a text search with all the strings passed in
const searchText = (...strings) => {
  let search = strings.join(' ').trim();
  if (search.length > 0) {
    return {
      $text: { $search: search}
    };
  }
  return {};
};

// returns an object to make regex searches on a field
const regex = (fieldName, search) => {
  if (search.length > 0) {
    return {
      $expr: {
        $regexMatch: {
          input: `$${fieldName}`,
          regex: new RegExp(search, 'i')
        }
      }
    };
  }
  return {};
};

module.exports = {
  checkInDate,
  checkOutDate,
  searchText,
  regex,
};
