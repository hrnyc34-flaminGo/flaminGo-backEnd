/**
 *  Accepts date string in format "YYYY-MM-DD" returns expression
 * to use in $match stage of aggregation pipeline to match documents
 * where the date of fieldName matches the input string.
 **/
const matchDateStr = (dateString, fieldName) => {
  if (dateString.length === 10) {
    return {
      $expr: {
        $eq: [
          dateString,
          {
            $dateToString: {
              date: `$${fieldName}`,
              format: '%Y-%m-%d'
            }
          }
        ]
      }
    };
  }
  return {};
};

/**
 * Returns a text search expression with all the strings passed in
 **/
const searchText = (...strings) => {
  let search = strings.join(' ').trim();
  if (search.length > 0) {
    return {
      $text: { $search: search}
    };
  }
  return {};
};

/**
 * Returns a regexMatch search expression to use on  on fieldName
 **/
const regexMatch = (fieldName, regexStr, regexOptions = 'i') => {
  if (regexStr.length > 0) {
    return {
      $expr: {
        $regexMatch: {
          input: `$${fieldName}`,
          regex: new RegExp(regexStr, regexOptions)
        }
      }
    };
  }
  // If no string was passed in return an empty object
  return {};
};

module.exports = {
  checkInDate,
  matchDateStr,
  searchText,
  regexMatch,
};
