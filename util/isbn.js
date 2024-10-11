exports.generateISBN = function () {
  return `ISBN-${String(Math.trunc(Math.random() * Math.pow(10, 10))).padStart(
    10,
    0,
  )}`;
};
