export default function getStudentIdsSum(arrayObjs) {
  if (Array.isArray(arrayObjs) === false) {
    return [];
  }
  const reducer = (accumulator, currentValue) => accumulator + currentValue.id;
  return arrayObjs.reduce(reducer, 0);
}
