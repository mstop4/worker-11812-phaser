const angleDifference = (t, p) => {
  const a = p - t + 180;
  return a - Math.floor(a/360) * 360 - 180;
};
const intRandomRange = (min, max) => Math.floor(Math.random() * (max - min)) + min;

module.exports = {
  angleDifference,
  intRandomRange
};