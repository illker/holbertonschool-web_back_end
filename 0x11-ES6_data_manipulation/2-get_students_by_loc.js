export default function getStudentsByLocation(arrayObjs, city) {
  if (Array.isArray(arrayObjs) === false) {
    return [];
  }
  return arrayObjs.filter((i) => i.location === city);
}
