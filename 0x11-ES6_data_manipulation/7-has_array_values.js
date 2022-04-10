export default function hasValuesFromArray(set, array) {
  return array.every((elements) => set.has(elements));
}
