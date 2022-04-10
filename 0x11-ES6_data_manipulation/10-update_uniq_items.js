export default function updateUniqueItems(groceries) {
  if (Object.getPrototypeOf(groceries) !== Map.prototype)
    throw TypeError('Cannot process');

  groceries.forEach((value, key) => {
    if (value === 1) {
      groceries.set(key, 100);
    }
  });
  return groceries;
}
