
module.exports = function calculateNumber (type, a, b) {
    const numberA = Number(a);
    const numberB = Number(b);
  
    if (Number.isNaN(numberA) || Number.isNaN(numberB)) { throw TypeError; }
  
    if (type === 'SUM') {
      return (Math.round(numberA) + Math.round(numberB));
    } else if (type === 'SUBTRACT') {
      return (Math.round(numberA) - Math.round(numberB));
    } else if (type === 'DIVIDE') {
      if (Math.round(numberB) === 0) {
        return ('Error');
      }
      return (Math.round(numberA) / Math.round(numberB));
    } else {
      throw TypeError;
    }
  };