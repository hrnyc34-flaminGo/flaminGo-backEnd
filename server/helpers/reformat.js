
const guestToName = ({firstName, lastName}) => {
  return firstName + ' ' + lastName;
};

const guestListToNameList = (guestList) => {
  return guestList.map(guestToName);
};

const decimal128ToFloat = (decimal) => {
  return parseFloat(decimal.toString()).toFixed(2);
};

module.exports = {guestToName, guestListToNameList, decimal128ToFloat};
