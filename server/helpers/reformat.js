
const guestToName = ({firstName, lastName}) => {
  return firstName + ' ' + lastName;
};

const guestListToNameList = (guestList) => {
  return guestList.map(guestToName);
};

module.exports = {guestToName, guestListToNameList};
