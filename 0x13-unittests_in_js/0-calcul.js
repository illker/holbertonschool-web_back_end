module.exports = function calculateNumber (a, b) {
    const numberA = Number(a);
    const numberB = Number(b);
  
    if (Number.isNaN(numberA) || Number.isNaN(numberB)) { throw TypeError; }
  
    return (Math.round(numberA) + Math.round(numberB));
  };