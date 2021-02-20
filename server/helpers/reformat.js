/**
 * Given guest object with firstName and lastName properties
 * this funciton will return the names concatanated with a
 * space separating them.
 */
const guestToName = ({ firstName, lastName }) => {
  return firstName + ' ' + lastName;
};

/**
 * Convert an array of guests to an array of name strings
 */
const guestListToNameList = (guestList) => {
  return guestList.map(guestToName);
};

/**
 * Given a decimal object returned from mongo this function will
 * return a string formatted for money. Ex. "13.37"
 */
const decimal128ToMoneyString = (decimal) => {
  return parseFloat(decimal.toString()).toFixed(2);
};

/**
 * Given a string that JS can turn in to a date this function will
 * return a string of just the date formatted "YYYY-MM-DD"
 * Ex. Input: "Sat Feb 20 2021" Output: "2021-02-20"
 */
const toDashDate = (timeString) => {
  let date = new Date(timeString);
  return date.toISOString().slice(0, 10);
};

/**
 * Given a string will return true if passed in string is "true"
 * otherwise it will return false
 */
const strToBool = (str) => {
  return str === 'true' ? true : false;
};

module.exports = {
  guestToName,
  guestListToNameList,
  decimal128ToMoneyString,
  toDashDate,
  strToBool
};
