const pointLineDist = (aX, aY, bX, bY, pX, pY) => {
  const nX = bX - aX;
  const nY = bY - aY;
  const paX = pX - aX;
  const paY = pY - aY;

  const dot_pan = dot2D(paX, paY, nX, nY);
  const len_sq = dot2D(nX, nY, nX, nY);

  const q = len_sq !== 0 ? Math.max(Math.min(dot_pan / len_sq, 1), 0) : 0;

  const dX = pX - (aX + q * nX);
  const dY = pY - (aY + q * nY);
  return Math.sqrt(dot2D(dX, dY, dX, dY));
};

const dot2D = (aX, aY, bX, bY) => (aX * bX) + (aY * bY);
const angleDifference = (t, p) => {
  const a = p - t + 180;
  return a - Math.floor(a/360) * 360 - 180;
};
const intRandomRange = (min, max) => Math.floor(Math.random() * (max - min)) + min;

module.exports = {
  pointLineDist,
  dot2D,
  angleDifference,
  intRandomRange
};