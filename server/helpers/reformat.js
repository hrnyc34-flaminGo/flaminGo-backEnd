const guestToName = ({ firstName, lastName }) => {
  return firstName + ' ' + lastName;
};

const guestListToNameList = (guestList) => {
  return guestList.map(guestToName);
};

const decimal128ToMoneyString = (decimal) => {
  return parseFloat(decimal.toString()).toFixed(2);
};

const toDashDate = (timeString) => {
  let date = new Date(timeString);
  return date.toISOString().slice(0, 10);
};

module.exports = {
  guestToName,
  guestListToNameList,
  decimal128ToMoneyString,
  toDashDate,
};
