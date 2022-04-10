export default function cleanSet(set, startString) {
  let valueString = '';
  if (startString === '') {
    return valueString;
  }
  set.forEach((item) => {
    if (item.includes(startString)) {
      valueString = valueString.concat(`-${item.replace(startString, '')}`);
    }
  });
  valueString = valueString.substring(1);

  return valueString;
}
